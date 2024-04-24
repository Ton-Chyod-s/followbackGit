const { main } = require('./src/git');

(async () => {
    const result = await main("Ton-Chyod-s");
    console.log(result);
})();