import Cocoa
import ApplicationServices

/// Watches the system-wide keyboard focus and reports whether it is an editable text field.
final class FocusMonitor {
    var onTextFieldFocusChanged: ((Bool) -> Void)?

    private var observer: AXObserver?
    private var isTextField = false
    private static let textRoles: Set<String> = ["AXTextField", "AXTextArea", "AXComboBox", "AXSearchField"]

    func start() {
        NSWorkspace.shared.notificationCenter.addObserver(
            forName: NSWorkspace.didActivateApplicationNotification, object: nil, queue: .main
        ) { [weak self] note in
            if let app = note.userInfo?[NSWorkspace.applicationUserInfoKey] as? NSRunningApplication {
                self?.attach(to: app)
            }
        }
        refresh()
    }

    func refresh() {
        if let app = NSWorkspace.shared.frontmostApplication { attach(to: app) }
    }

    private func attach(to app: NSRunningApplication) {
        let pid = app.processIdentifier
        guard pid != getpid() else { return }

        if let old = observer {
            CFRunLoopRemoveSource(CFRunLoopGetMain(), AXObserverGetRunLoopSource(old), .defaultMode)
            observer = nil
        }

        let appElement = AXUIElementCreateApplication(pid)
        // Chrome / Electron only expose web text fields when asked to.
        AXUIElementSetAttributeValue(appElement, "AXManualAccessibility" as CFString, kCFBooleanTrue)

        let callback: AXObserverCallback = { _, element, _, refcon in
            guard let refcon else { return }
            Unmanaged<FocusMonitor>.fromOpaque(refcon).takeUnretainedValue().evaluate(element)
        }
        var obs: AXObserver?
        guard AXObserverCreate(pid, callback, &obs) == .success, let obs else { update(false); return }
        AXObserverAddNotification(obs, appElement, kAXFocusedUIElementChangedNotification as CFString,
                                  Unmanaged.passUnretained(self).toOpaque())
        CFRunLoopAddSource(CFRunLoopGetMain(), AXObserverGetRunLoopSource(obs), .defaultMode)
        observer = obs

        var focused: CFTypeRef?
        if AXUIElementCopyAttributeValue(appElement, kAXFocusedUIElementAttribute as CFString, &focused) == .success,
           let focused, CFGetTypeID(focused) == AXUIElementGetTypeID() {
            evaluate(focused as! AXUIElement)
        } else {
            update(false)
        }
    }

    private func evaluate(_ element: AXUIElement) {
        let role = string(element, kAXRoleAttribute)
        let subrole = string(element, kAXSubroleAttribute)
        // Never listen in password fields.
        let isSecure = subrole == "AXSecureTextField" || role == "AXSecureTextField"
        var editable = Self.textRoles.contains(role ?? "")
        if !editable, let r = role, r == "AXWebArea" || r == "AXGroup" {
            // contenteditable areas in browsers (Gmail, Slack web, Notion…)
            editable = bool(element, "AXEditable") ?? false
        }
        update(editable && !isSecure)
    }

    private func update(_ value: Bool) {
        isTextField = value
        DispatchQueue.main.async { self.onTextFieldFocusChanged?(value) }
    }

    private func string(_ el: AXUIElement, _ attr: String) -> String? {
        var v: CFTypeRef?
        guard AXUIElementCopyAttributeValue(el, attr as CFString, &v) == .success else { return nil }
        return v as? String
    }

    private func bool(_ el: AXUIElement, _ attr: String) -> Bool? {
        var v: CFTypeRef?
        guard AXUIElementCopyAttributeValue(el, attr as CFString, &v) == .success else { return nil }
        return (v as? NSNumber)?.boolValue
    }
}
