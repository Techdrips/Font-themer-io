const fs = require('fs');
const path = require('path');

function generateMobileConfig(fonts) {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>PayloadContent</key>
        <array>`;
    
    fonts.forEach(font => {
        xml += `
        <dict>
            <key>PayloadType</key>
            <string>com.apple.font</string>
            <key>PayloadIdentifier</key>
            <string>com.example.font.${font.name}</string>
            <key>PayloadUUID</key>
            <string>${generateUUID()}</string>
            <key>PayloadDisplayName</key>
            <string>${font.name}</string>
            <key>PayloadDescription</key>
            <string>Installs custom font for use across apps</string>
            <key>PayloadType</key>
            <string>com.apple.font</string>
            <key>Font</key>
            <string>${font.filePath}</string>
        </dict>`;
    });
    
    xml += `
        </array>
        <key>PayloadIdentifier</key>
        <string>com.example.fonts</string>
        <key>PayloadUUID</key>
        <string>${generateUUID()}</string>
        <key>PayloadDisplayName</key>
        <string>Custom Fonts</string>
        <key>PayloadType</key>
        <string>Configuration</string>
    </dict>
    </plist>`;
    
    return xml;
}

// Helper to generate UUIDs
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

module.exports = { generateMobileConfig };
