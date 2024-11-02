const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// File to store posts data
const POSTS_FILE = path.join(__dirname, 'data', 'posts.json');

// Endpoint to create a new post
app.post('/api/posts', (req, res) => {
    const newPost = req.body;
    
    // Read existing posts
    fs.readFile(POSTS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read posts' });

        let posts = data ? JSON.parse(data) : [];
        posts.push(newPost);

        // Write updated posts back to file
        fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Failed to save post' });
            res.status(201).json({ message: 'Post saved successfully' });
        });
    });
});

// Endpoint to retrieve all posts
app.get('/api/posts', (req, res) => {
    fs.readFile(POSTS_FILE, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to load posts' });
        const posts = data ? JSON.parse(data) : [];
        res.json(posts);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
