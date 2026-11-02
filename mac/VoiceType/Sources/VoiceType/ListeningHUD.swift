import Cocoa

/// Small floating pill at the top of the screen showing the mic is live. Never takes focus.
final class ListeningHUD {
    private lazy var panel: NSPanel = {
        let p = NSPanel(contentRect: NSRect(x: 0, y: 0, width: 130, height: 32),
                        styleMask: [.nonactivatingPanel, .borderless], backing: .buffered, defer: true)
        p.level = .statusBar
        p.isOpaque = false
        p.backgroundColor = .clear
        p.ignoresMouseEvents = true
        p.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary]
        let bg = NSVisualEffectView(frame: p.contentView!.bounds)
        bg.material = .hudWindow
        bg.state = .active
        bg.wantsLayer = true
        bg.layer?.cornerRadius = 16
        let label = NSTextField(labelWithString: "🔴  Listening…")
        label.font = .systemFont(ofSize: 13, weight: .medium)
        label.frame = NSRect(x: 0, y: 7, width: 130, height: 18)
        label.alignment = .center
        bg.addSubview(label)
        p.contentView = bg
        return p
    }()

    func show() {
        if let screen = NSScreen.main {
            let f = screen.visibleFrame
            panel.setFrameOrigin(NSPoint(x: f.midX - 65, y: f.maxY - 44))
        }
        panel.orderFrontRegardless()
    }

    func hide() { panel.orderOut(nil) }
}
