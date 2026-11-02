import AVFoundation
import Speech

/// Streams the microphone into Apple's speech recognizer and types results live.
final class Dictation {
    var onListeningChanged: ((Bool) -> Void)?

    private let engine = AVAudioEngine()
    private let recognizer = SFSpeechRecognizer(locale: Locale.current) ?? SFSpeechRecognizer(locale: Locale(identifier: "en-US"))!
    private var request: SFSpeechAudioBufferRecognitionRequest?
    private var task: SFSpeechRecognitionTask?
    private var generation = 0
    private var typed = ""             // text typed for the current segment
    private var wroteAnySegment = false
    private var silenceTimer: Timer?
    private(set) var running = false

    func start() {
        guard !running else { return }
        guard SFSpeechRecognizer.authorizationStatus() == .authorized else {
            NSLog("VoiceType: speech recognition not authorized"); return
        }
        let input = engine.inputNode
        let format = input.outputFormat(forBus: 0)
        input.removeTap(onBus: 0)
        input.installTap(onBus: 0, bufferSize: 1024, format: format) { [weak self] buffer, _ in
            self?.request?.append(buffer)
        }
        engine.prepare()
        do { try engine.start() } catch {
            NSLog("VoiceType: audio engine failed: \(error)"); return
        }
        running = true
        wroteAnySegment = false
        startSegment()
        onListeningChanged?(true)
    }

    func stop() {
        guard running else { return }
        running = false
        generation += 1
        silenceTimer?.invalidate()
        task?.cancel()
        request?.endAudio()
        task = nil
        request = nil
        engine.stop()
        engine.inputNode.removeTap(onBus: 0)
        onListeningChanged?(false)
    }

    private func startSegment() {
        generation += 1
        let gen = generation
        typed = ""
        let req = SFSpeechAudioBufferRecognitionRequest()
        req.shouldReportPartialResults = true
        if recognizer.supportsOnDeviceRecognition { req.requiresOnDeviceRecognition = true }
        req.addsPunctuation = true
        request = req
        task = recognizer.recognitionTask(with: req) { [weak self] result, error in
            DispatchQueue.main.async { self?.handle(result: result, error: error, gen: gen) }
        }
    }

    private func handle(result: SFSpeechRecognitionResult?, error: Error?, gen: Int) {
        guard running, gen == generation else { return }
        if let result {
            var text = result.bestTranscription.formattedString
            if wroteAnySegment && !text.isEmpty { text = " " + text }
            Typer.replace(old: typed, with: text)
            typed = text
            if !text.isEmpty { resetSilenceTimer() }
            if result.isFinal { finishSegment(); return }
        }
        if error != nil { finishSegment() }
    }

    /// After a pause, lock in the current phrase and begin a new one.
    private func resetSilenceTimer() {
        silenceTimer?.invalidate()
        silenceTimer = Timer.scheduledTimer(withTimeInterval: 1.5, repeats: false) { [weak self] _ in
            self?.request?.endAudio()
        }
    }

    private func finishSegment() {
        silenceTimer?.invalidate()
        if !typed.isEmpty { wroteAnySegment = true }
        task = nil
        if running { startSegment() }
    }
}
