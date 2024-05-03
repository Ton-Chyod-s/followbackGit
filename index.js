const { follow } = require('./src/follow');
const { main } = require('./src/git');
const { unfollow } = require('./src/unfollow');
const { user } = require('./src/utility/user');

const express = require('express');

const server = express();
const port = 3000;

server.get('/', (req, res) => {
    res.json({
        '': "Bem vindo a API GitHub Followers Checker",
        'Ver seguidores': "exemplo - comparacao/:username",
        'Obter mais seguidores': "exemplo - /seguir/:username/:user",
        'Deixar de seguir': "exemplo - /naoSeguir/:username"
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

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});