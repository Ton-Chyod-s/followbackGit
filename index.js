const { main } = require('./src/git');
const express = require('express');

const server = express();
const port = 3000;

server.get('/:username', async (req, res) => {
    const { username } = req.params;
    const result = await main(username);
    res.json(result);
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});