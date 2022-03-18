const express = require('express');
const router  = express.Router();
const Job     = require('../models/Job');

//rota criada para teste
router.get('/test', (req, res) => {
    res.send('deu certo');
})

//rota de add
router.get('/add', (req, res) => {
    res.render('add'); // adiciona no espaço {{{ body }}} a parte de html que está em index.handlebars
})

//add job via post
router.post('/add' , (req, res) => {

    let {title, description, salary, company, email, new_job} = req.body;

    //insert
    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
});

module.exports = router