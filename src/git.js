
async function main() {
    await init();
    await load();
    await run();
  }
  
  if (require.main === module) {
    main();
  }