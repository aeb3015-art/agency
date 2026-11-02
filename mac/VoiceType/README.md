# VoiceType (macOS)

Click into any text field, in any app, and start talking. VoiceType listens automatically and types what you say. Click out of the field and it stops.

## Build and install (on your Mac)

You need macOS 13+ and Xcode or the Command Line Tools (`xcode-select --install`).

```bash
cd mac/VoiceType
./build.sh
```

This builds the app, installs it to `/Applications/VoiceType.app`, and launches it. A mic icon appears in the menu bar.

## First run: permissions

1. **Accessibility**: System Settings → Privacy & Security → Accessibility → turn on **VoiceType**. It needs this to detect focused text fields and to type.
2. **Microphone** and **Speech Recognition**: click *Allow* when asked.

If you rebuild the app, macOS may stop trusting the new build. Remove VoiceType from the Accessibility list with the **−** button, then add it again.

## Testing

1. Open Notes, TextEdit, or a browser search box, and click into the text area.
2. The menu-bar mic turns red and a "Listening…" pill appears.
3. Speak. The words appear as you talk, and pause for about 1.5s between phrases.
4. Click somewhere that isn't a text field. Listening stops.
5. Password fields never trigger listening.

Use the menu-bar icon to turn auto-dictation off and on.

Logs: `log stream --predicate 'process == "VoiceType"'`
