#!/bin/bash
# Builds VoiceType.app and installs it to /Applications.
set -euo pipefail
cd "$(dirname "$0")"
swift build -c release
APP=build/VoiceType.app
rm -rf "$APP"
mkdir -p "$APP/Contents/MacOS"
cp .build/release/VoiceType "$APP/Contents/MacOS/VoiceType"
cp Info.plist "$APP/Contents/Info.plist"
codesign --force --deep --sign - "$APP"
pkill -x VoiceType 2>/dev/null || true
rm -rf /Applications/VoiceType.app
cp -R "$APP" /Applications/
echo "Installed /Applications/VoiceType.app"
open /Applications/VoiceType.app
