// Importando a conexão com o banco de dados
const db = require('./db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Definindo o esquema do modelo Proprietario com tudo
const ProprietarioSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true
    },
    veiculos: {
        type: [{
            placa: {
                type: String,
                required: true
            },
            ano: {
                type: Number,
                required: true
            },
            mensalidade: {
                type: Number,
                required: true
            }
        }],
        default: [] // garante que nunca será null
    }
}, { collection: 'Proprietario' });
// Especificando o nome da coleção como 'Proprietario'
// Criando o modelo Proprietario baseado no esquema
const Proprietario = mongoose.model("Proprietario", ProprietarioSchema);
// Exportando o modelo Proprietario
module.exports = Proprietario;