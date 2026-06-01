const express = require('express');
const router = express.Router();
const Proprietario = require("../models/Proprietario");
// Busca todos os proprietários (GET)
router.get('/', async (req, res) => {
    try {
        const proprietarios = await Proprietario.find();
        res.status(200).json(proprietarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Cadastra um novo proprietário (POST)
router.post('/', async (req, res) => {
    try {
        const { nome, cpf, veiculos } = req.body;
        const newProprietario = new Proprietario({
            nome, cpf, veiculos
        });
        await newProprietario.save();
        res.status(201).json({ message: 'Cadastrado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Busca um proprietário por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const proprietario = await Proprietario.findById(req.params.id);
        res.status(200).json(proprietario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Deleta um proprietário por ID (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Proprietario.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Altera um proprietário por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const { nome, cpf, veiculos } = req.body;
        await Proprietario.findByIdAndUpdate(req.params.id, {
            nome, cpf,
            veiculos
        });
        res.status(200).json({ message: 'Atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;