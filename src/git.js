const { axios } = require('axios');
const { cheerio } = require('cheerio');

async function main() {
    await init();
    await load();
    await run();
  }
  
  if (require.main === module) {
    main();
  }