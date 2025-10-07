const express = require('express');
const router = express.Router();

// Mock Data
let areas = [
    { id: 1, nome: "Educação" },
    { id: 2, nome: "Saúde" },
    { id: 3, nome: "Meio Ambiente" }
];

let voluntarios = [
    {
        id: 1,
        nome: "Maria Oliveira",
        email: "maria@email.com",
        telefone: "11999999999",
        data_cadastro: "2025-10-01T14:30:00Z",
        areas_interesse: [1, 3]
    }
];

// CREATE - Cadastrar voluntário
router.post('/', (req, res) => {
    const novoVoluntario = {
        id: voluntarios.length + 1,
        ...req.body,
        data_cadastro: new Date().toISOString()
    };
    voluntarios.push(novoVoluntario);
    res.status(201).json({ message: "Voluntário cadastrado!", voluntario: novoVoluntario });
});

// READ - Listar voluntários
router.get('/', (req, res) => {
    const response = voluntarios.map(v => ({
        ...v,
        areas_interesse_detalhes: v.areas_interesse.map(id => areas.find(a => a.id === id)?.nome)
    }));
    res.json(response);
});

// READ - Voluntário por ID
router.get('/:id', (req, res) => {
    const v = voluntarios.find(v => v.id === parseInt(req.params.id));
    if (!v) return res.status(404).json({ error: "Voluntário não encontrado." });
    v.areas_interesse_detalhes = v.areas_interesse.map(id => areas.find(a => a.id === id)?.nome);
    res.json(v);
});

// UPDATE - Atualizar voluntário
router.put('/:id', (req, res) => {
    const voluntario = voluntarios.find(v => v.id === parseInt(req.params.id));
    if (!voluntario) return res.status(404).json({ error: "Voluntário não encontrado." });

    Object.assign(voluntario, req.body);
    res.json({ message: "Voluntário atualizado com sucesso!", voluntario });
});

// DELETE - Remover voluntário
router.delete('/:id', (req, res) => {
    const index = voluntarios.findIndex(v => v.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: "Voluntário não encontrado." });

    const removido = voluntarios.splice(index, 1);
    res.json({ message: "Voluntário removido com sucesso!", voluntario: removido[0] });
});

module.exports = router;
