import CoreGraphics

/// Types into whatever app has keyboard focus by posting synthetic key events.
enum Typer {
    private static let deleteKey: CGKeyCode = 51

    /// Updates on-screen text from `old` to `new`, deleting only the part that changed.
    static func replace(old: String, with new: String) {
        let o = Array(old), n = Array(new)
        var i = 0
        while i < o.count, i < n.count, o[i] == n[i] { i += 1 }
        for _ in 0..<(o.count - i) { press(deleteKey) }
        if i < n.count { type(String(n[i...])) }
    }

    static func type(_ text: String) {
        let src = CGEventSource(stateID: .hidSystemState)
        var units = Array(text.utf16)
        while !units.isEmpty {
            let chunk = Array(units.prefix(16))
            units.removeFirst(chunk.count)
            for down in [true, false] {
                let e = CGEvent(keyboardEventSource: src, virtualKey: 0, keyDown: down)
                e?.flags = []
                e?.keyboardSetUnicodeString(stringLength: chunk.count, unicodeString: chunk)
                e?.post(tap: .cghidEventTap)
            }
        }
    }

    private static func press(_ key: CGKeyCode) {
        let src = CGEventSource(stateID: .hidSystemState)
        for down in [true, false] {
            let e = CGEvent(keyboardEventSource: src, virtualKey: key, keyDown: down)
            e?.flags = []
            e?.post(tap: .cghidEventTap)
        }
    }
}
