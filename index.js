const { follow } = require('./src/follow');
const { checkFollow } = require('./src/checkFollow');
const { main } = require('./src/checkFollower');
const { unfollow } = require('./src/unfollow');
const { user } = require('./src/utility/user');
const { webScrapingData } = require('./src/utility/webScrapingData');

const express = require('express');

const server = express();
const port = 3000;

server.get('/', (req, res) => {
    res.json({
        "": "Welcome to the GitHub Followers Checker API",
        "First": "Create user with your git - /user/:email/:password",
        "Second": "Get token - /token",
        "View followers": "Example - comparison/:username",
        "Get more followers": "Example - /follow/:username/:user",
        "Unfollow": "Example - /unfollow/:username"
    });
});

server.get('/comparacao/:username', async (req, res) => {
    const { username } = req.params;
    const result = await main(username);
    res.json(result);
});

server.get('/naoSeguir/:username', async (req, res) => {
    const { username } = req.params;
    const result = await unfollow(username);
    res.json(result);
});

server.get('/seguir/:username/:user', async (req, res) => {
    const { username } = req.params;
    const { user } = req.params.user;
    const result = await follow(username, user);
    res.json(result);
});

server.get('/usuario/:email/:senha', async (req, res) => {
    const { email, senha } = req.params;
    const result = await user(email, senha);
    res.json(result);
});

server.get('/token', async (req, res) => {
    const { email, senha } = req.params;
    const result = await webScrapingData(email, senha);
    res.json(result);
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});