const { main } = require('./src/git');
const express = require('express');

const server = express();
const port = 3000;

server.get('/', (req, res) => {
    res.json({
        'Doc': "Welcome to the Git User Info API",
        'Usage': "To get the user info, use the endpoint /:username where username is the github username",
    });
});

server.get('/:username', async (req, res) => {
    const { username } = req.params;
    const result = await main(username);
    res.json(result);
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});