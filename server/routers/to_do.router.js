const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


//API Calls
// GET
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "to_do_list" ORDER BY "completed" ASC;`)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    });
});

//POST
router.post('/' (req, res))




module.exports = router;