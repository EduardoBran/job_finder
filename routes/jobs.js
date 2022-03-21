const express = require('express');
const router  = express.Router();
const Job     = require('../models/Job');

//rota para teste
router.get('/test', (req, res) => {
    res.send('deu certo');
});

//rota de detalhe da vaga
router.get('/view/:id', (req, res) => 
    Job.findOne({
        where: {id: req.params.id}
    }).then(job => {

        res.render('view' , {
            job
        });
    }).catch(err => console.log(err)));


//rota para add
router.get('/add', (req, res) => {
    res.render('add'); // adiciona no espaço {{{ body }}} a parte de html que está em add.handlebars
});

//rota para add via post
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
    .then(() => res.redirect('/')) //redireciona de volta a página principal    
    .catch(err => console.log(err));
});

module.exports = router