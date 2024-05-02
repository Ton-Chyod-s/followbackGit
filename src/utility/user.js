// create file token.js
if (!fs.existsSync(path.join(__dirname, 'key'))) {
    fs.mkdirSync(path.join(__dirname, 'key'));
}

// write usuario in file
(function user (email, senha) {
    const token = `email = ${email} ;\nsenha = ${senha};\n\nmodule.exports = { email, senha };`
    const filePath = path.join(__dirname, 'key', 'usuario.js');
    fs.writeFile(filePath, token, 'utf8', function (err) {
        if (err) return console.log(err);
    });
})();

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await user ('email', 'senha');
    })();
}