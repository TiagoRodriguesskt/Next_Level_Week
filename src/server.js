const express = require("express")
const server = express()

//PEGAR O BANCO DE DADOS
const db = require("./database/db")

//CONFIGURAR(CHAMANDO A PASTA) PASTA PÚBLICA
server.use(express.static("public"))

//HABILITAR O USO DE REQ.BODY NA NOSSA APLICAÇÃO
server.use(express.urlencoded({ extended: true }))


//UTILIZANDO TEMPLATE ENGINE(NUNJUCKS)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//CONFIGURAR CAMINHOS DA MINHA APLICAÇÃO
//PÁGINA INICIAL
//REQ: REQUISIÇÃO (SOLICITANDO O SERVIDOR)
//RES: RESPOSTA
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"})
})



server.get("/create-point", (req, res) => {

    //REQ.QUERY: QUERY STRING DA NOSSA URL
    //CONSOLE.LOG(REQ.QUERY)


    return res.render("create-point.html")
})

//SALVANDO OS DADOS COM POST
server.post("/savepoint", (req, res) => {

    //REQ.BODY: O CORPO DO NOSSO FORMULÁRIO
    //CONSOLE.LOG(REQ.BODY)

    //INSERIR DADOS NO BANCO DE DADOS
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

})



server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == "") {
        //PESQUISA VAZIA
        return res.render("search-results.html", { total: 0})
    }

    //PEGAR OS DADOS QUE ESTÁ CADASTRDO NO BANCO DE DADOS
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        //MOSTRAR A PÁGINA COM OS DADOS DO BANCO DE DADOS
        return res.render("search-results.html", { places: rows, total: total})
    })
})


//LIGAR O SERVIDOR E MOSTRAR UMA MENSAGEM DE SERVIDOR LIGADO
server.listen(3000)