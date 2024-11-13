const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { generateMobileConfig } = require('./profileGenerator');  // Utility to generate .mobileconfig

const app = express();
const port = 3000;

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));  // Serve static files (HTML, CSS, JS)

app.post('/upload', upload.single('font'), (req, res) => {
    const fontZipPath = req.file.path;
    
    // Unzip and extract font files (implement unzip logic)
    const fonts = extractFontsFromZip(fontZipPath);  // Helper function for unzipping and parsing
    
    // Generate configuration profile based on fonts
    const profile = generateMobileConfig(fonts);
    
    // Save the profile to a temp file and send it back to the user
    const profilePath = path.join(__dirname, 'temp', 'font-config.mobileconfig');
    fs.writeFileSync(profilePath, profile);
    
    res.download(profilePath, 'font-config.mobileconfig', () => {
        // Cleanup temp files after download
        fs.unlinkSync(fontZipPath);
        fs.unlinkSync(profilePath);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
