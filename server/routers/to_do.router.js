const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


//API Calls
// GET
router.get('/', (req, res) => {
    pool.query(`SELECT * FROM "to_do_list" ORDER BY "completed" DESC;`)
    .then((response) => {
        res.send(response.rows);
    })
    .catch((err) => {
        res.sendStatus(500);
    });
});
//POST
router.post('/', (req, res) => {
    const newTask = req.body;
    console.log(newTask);
    const queryString = `INSERT INTO "to_do_list" ("task", "completed")
                        VALUES ('${newTask.task}', '${newTask.completed}');`;

    pool.query(queryString)  
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
});
 //DELETE
 router.delete('/:id', (req,res) => {
    console.log(req.params.id);
    const taskID = req.params.id;
    const queryString = `DELETE FROM "to_do_list" WHERE "id" = ${taskID};`;

    pool.query(queryString)
    .then((response) => {
        res.sendStatus(200);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
 });
 //PUT
    




module.exports = router;