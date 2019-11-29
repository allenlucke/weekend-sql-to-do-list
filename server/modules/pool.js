//Imports postgreSQL
const pg = require('pg');
//What is pg. Pool????
const Pool = pg.Pool;
//Tells pool what database to look for????
const pool = new Pool ({
    database: "weekend-to-do-app",
    host: "localhost",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', ()=>{
    console.log('connected!');
});

pool.on('error', (error) => {
    console.log(`err:  ${error}`);
});

// Exports database
module.exports = pool;