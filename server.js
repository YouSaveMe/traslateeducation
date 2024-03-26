const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/signup', async (req, res) => {
    const { username, email } = req.body;
    try {
        const response = await fetch(`https://yourwordpresssite.com/wp-json/wp/v2/pages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_WORDPRESS_AUTH_TOKEN'
            },
            body: JSON.stringify({
                title: username,
                content: `${username}'s page`,
                status: 'publish'
            })
        });
        if (response.ok) {
            const pageData = await response.json();
            res.status(200).json({ message: 'Page created successfully', pageId: pageData.id });
        } else {
            res.status(response.status).json({ message: 'Failed to create page' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
