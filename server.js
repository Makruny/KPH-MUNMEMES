const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const axios = require('axios'); // To make HTTP requests to Imgur API

const app = express();
const port = 3000;

// Enable CORS
app.use(cors());

// Set up multer to handle file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Store uploaded meme URLs in memory
let memes = [];

// Imgur API credentials (use your own)
const IMGUR_CLIENT_ID = 'adbbc0d7250341e'; // Client ID from Imgur
const IMGUR_CLIENT_SECRET = 'c1e2fbdc8d94b46e7a944e016fa32b55be5e42c3'; // Client Secret from Imgur

// Route to upload meme to Imgur
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    try {
        const formData = new FormData();
        formData.append('image', req.file.buffer.toString('base64'));

        // Send image to Imgur via their API
        const response = await axios.post('https://api.imgur.com/3/image', formData, {
            headers: {
                'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
                'Content-Type': 'application/json',
            },
        });

        const imageUrl = response.data.data.link;
        memes.push(imageUrl); // Store the image URL in the memes array

        res.json({ success: true, url: imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to upload meme' });
    }
});

// Route to fetch all memes
app.get('/memes', (req, res) => {
    res.json({ memes: memes });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
