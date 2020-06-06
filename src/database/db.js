//IMPORTAR A DEPENDENCIA DO SQLITE3
const sqlite3 = require("sqlite3").verbose()

//CRIAR O OBJETO QUE IRÁ FAZER OPERAÇÕES NO BANCO DE DADOS
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//UTILIZAR O OBJETO DE BANCO DE DADOS, PARA OPERAÇÕES
db.serialize(() => {

    //COMANDO SQL:

    //1-CRIAR UMA TABELA 
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //2-INSERIR DADOS NA TABELA
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?); //? PARA INSERIR OS NOMES DOS CAMPOS ACIMA
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Resíduos Eletrônicos, Lâmpadas"
//     ]

// //DEPOIS QUE INSERINDO OS DADOS
//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     //db.run(query, values, afterInsertData) //EXECUTANDO TODO OS DADOS NA TABELA


//     //3-CONSULTAR OS DADOS DE TABELA
//     db.all(`SELECT * FROM places`, function(err, rows) {
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Aqui estão seus registros: ")
//         console.log(rows)
//     })

    //4-DELETAR UM DADOS DA TABELA
    // db.run(`DELETE FROM places WHERE id = ?`, [9], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log("Registro deletado com sucesso!")
    // })
})