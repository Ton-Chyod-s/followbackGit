const { follow } = require('./src/follow');
const { main } = require('./src/git');
const express = require('express');

const server = express();
const port = 3000;

server.get('/', (req, res) => {
    res.json({
        '': "Bem vindo a API GitHub Followers Checker",
        'Ver seguidores': "exemplo - comparacao/:username",
        'Obter mais seguidores': "exemplo - /seguir/:username/:user",
    });
});

server.get('/comparacao/:username', async (req, res) => {
    const { username } = req.params;
    const result = await main(username);
    res.json(result);
});

server.get('/seguir/:username/:user', async (req, res) => {
    const { username } = req.params;
    const { user } = req.params.user;
    const result = await follow(username, user);
    res.json(result);
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});