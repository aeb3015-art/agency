import Cocoa
import AVFoundation
import Speech

final class AppDelegate: NSObject, NSApplicationDelegate {
    private var statusItem: NSStatusItem!
    private let focus = FocusMonitor()
    private let dictation = Dictation()
    private let hud = ListeningHUD()
    private var enabled = true
    private var startWork: DispatchWorkItem?

    func applicationDidFinishLaunching(_ notification: Notification) {
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        setIcon(listening: false)
        buildMenu()
        requestPermissions()

        dictation.onListeningChanged = { [weak self] listening in
            self?.setIcon(listening: listening)
            listening ? self?.hud.show() : self?.hud.hide()
        }

        focus.onTextFieldFocusChanged = { [weak self] isTextField in
            guard let self else { return }
            self.startWork?.cancel()
            if isTextField && self.enabled {
                // Short delay so quickly tabbing through fields doesn't flicker the mic.
                let work = DispatchWorkItem { [weak self] in self?.dictation.start() }
                self.startWork = work
                DispatchQueue.main.asyncAfter(deadline: .now() + 0.25, execute: work)
            } else {
                self.dictation.stop()
            }
        }
        focus.start()
    }

    private func requestPermissions() {
        let opts = [kAXTrustedCheckOptionPrompt.takeUnretainedValue() as String: true] as CFDictionary
        if !AXIsProcessTrustedWithOptions(opts) {
            NSLog("VoiceType: Accessibility permission not granted yet")
        }
        AVCaptureDevice.requestAccess(for: .audio) { ok in NSLog("VoiceType: mic access \(ok)") }
        SFSpeechRecognizer.requestAuthorization { s in NSLog("VoiceType: speech auth \(s.rawValue)") }
        // The focus observer needs Accessibility; retry until it's granted.
        Timer.scheduledTimer(withTimeInterval: 2, repeats: true) { [weak self] t in
            if AXIsProcessTrusted() { t.invalidate(); self?.focus.refresh() }
        }
    }

    private func setIcon(listening: Bool) {
        let name = listening ? "mic.fill" : (enabled ? "mic" : "mic.slash")
        let img = NSImage(systemSymbolName: name, accessibilityDescription: "VoiceType")
        img?.isTemplate = !listening
        statusItem.button?.image = img
        statusItem.button?.contentTintColor = listening ? .systemRed : nil
    }

    private func buildMenu() {
        let menu = NSMenu()
        let toggle = NSMenuItem(title: "Auto-dictate in text fields", action: #selector(toggleEnabled(_:)), keyEquivalent: "")
        toggle.target = self
        toggle.state = enabled ? .on : .off
        menu.addItem(toggle)
        menu.addItem(.separator())
        let ax = NSMenuItem(title: "Open Accessibility Settings…", action: #selector(openAX), keyEquivalent: "")
        ax.target = self
        menu.addItem(ax)
        menu.addItem(.separator())
        menu.addItem(NSMenuItem(title: "Quit VoiceType", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q"))
        statusItem.menu = menu
    }

    @objc private func toggleEnabled(_ sender: NSMenuItem) {
        enabled.toggle()
        sender.state = enabled ? .on : .off
        if !enabled { dictation.stop() }
        setIcon(listening: false)
    }

    @objc private func openAX() {
        NSWorkspace.shared.open(URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility")!)
    }
}
