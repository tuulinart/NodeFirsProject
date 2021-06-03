const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const database = require("./database/database")
const Quest = require("./models/quest");
const mongoose = require("mongoose");
const Answer = require("./models/answer")


//Estou dizendo para o express usar o EJS como View Engine.
app.set("view engine", "ejs");
app.use(express.static("public"))


//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//ROUTES
app.get("/", (req, res) => {
    //CONTROLLER, PRECISA REFATORAR O CODIGO DEPOIS, SEPARAR POR PASTAS. 
    Quest.find().sort({ created: -1 }).then(quests => {
        console.log(quests);
        res.render("index", {
            quests: quests
        });
    })

});

app.get("/ask", (req, res) => {
    res.render("answer");
});

app.post("/savequest", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;

    //CONTROLLER, PRECISA REFATORAR O CODIGO DEPOIS, SEPARAR POR PASTAS. 
    Quest.create({
        title: title,
        description: description,
    }).then(() => {
        res.redirect("/");
    });

});



app.get("/quest/:id", (req, res) => {
    var id = req.params.id;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        Quest.findById(id).then(quest => {
            if (quest != undefined) {

                Answer.find({askId: quest._id}).sort({ created: 1 }).then(answer => {
                    res.render("quest", {
                        quest: quest,
                        answer: answer,
                    });
                })

            }
        })
    } else {
        res.redirect("/");
    }
});


app.post("/answer", (req, res) => {
    var body = req.body.body;
    var askId = req.body.answer;

    Answer.create({
        body: body,
        askId: askId,
    }).then(() => {
        res.redirect(`/quest/${askId}`);
    });

})




app.listen(3000, () => {
    console.log("App rodando! ");
});

























//APRENDIZADO

/*
app.get("/:nome/:lang", (req, res) => {
    //var nome = "Enzo Fonseca";
    //var lang = "JS";
    var nome = req.params.nome;
    var lang = req.params.lang;
    var exibirMsg = false;

    var produtos = [
        { nome: "Doritos", preco: 3.14 },
        { nome: "Coca-Cola", preco: 5 },
        { nome: "Leite", preco: 1.45 },
    ]
    //pegando as informações pelo query params;
    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "Guia do programador",
        inscritos: 8000,
        msg: exibirMsg,
        produtos: produtos,
    });
    /* Quando usamos o "res.render" automaticamente ele puxa os arquivos da pasta views
    por isso não preciso passar o diretorio completo, somente o nome do arquivo;
});

app.listen(3000, () => {
    console.log("App rodando! ");
});
*/