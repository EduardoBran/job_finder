const express    = require('express');
const exphbs     = require('express-handlebars');
const app        = express();
const path       = require('path');
const db         = require('./db/connection');
const bodyParser = require('body-parser');
const Job        = require('./models/Job');
const Sequelize  = require('sequelize');
const Op         = Sequelize.Op;

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`O express está rodando na porta ${PORT}`);
});

//body parser
app.use(bodyParser.urlencoded({extended: false}));

//handle bars
app.set('views', path.join(__dirname, 'views'));                  //o path entende qual o diretório base da aplicação, ele acessa as views e recupera os dados para inserir em {{{body}}}
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'})); //main configurado como arquivo principal, sempre estará rondando independente da página. Busca o arquivo main.handlebars na pasta layouts
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//db connection
db
    .authenticate()
    .then(() => {
        console.log("Conectou ao banco com sucesso");
    })
    .catch(err => {
        console.log("Ocorreu um erro ao conectar", err);
    });

//routes
app.get('/', (req, res) => {

    let search = req.query.job;
    let query = '%'+search+'%'; // PH -> PHP, Word -> Wordpress, press -> Wordpress

    if(!search){
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            
            res.render('index', { //aqui ele adiciona no espaço {{{ body }}} a parte de html que está em index.handlebars
                jobs              //renderizou a view com todas as jobs dentro dela
            });         
        })
        .catch(err => console.log(err));
    }
    else{
        Job.findAll({
            where: {title: {[Op.like]: query}},    //fazer consulta baseada no título que contém a palavra pesquisada
            order: [
                ['createdAt', 'DESC']
        ]})
        .then(jobs => {            
            res.render('index', { 
                jobs, search              
            });         
        })
        .catch(err => console.log(err));
    }   
});

//jobs routes
app.use('/jobs', require('./routes/jobs'));