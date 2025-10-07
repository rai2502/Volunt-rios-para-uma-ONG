const express = require('express');
const app = express();
const voluntariosRoutes = require('./routes/voluntarios');

app.use(express.json());
app.use('/api/voluntarios', voluntariosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
