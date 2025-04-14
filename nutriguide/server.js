const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;
// Configura CORS
app.use(cors());
// Crea una nueva instancia de Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432
});

async function obtenerAlimento(horario) {
    const query = 'SELECT * FROM "NutriApp"."alimento" WHERE horario = $1 ORDER BY RANDOM() LIMIT 1;';
    const result = await pool.query(query, [horario]);
    return result.rows[0]; // Devuelve el primer alimento encontrado del horario pasado como argumento
}

async function obtenerAlimentoTipo(horario, tipo) {
    const query = 'SELECT * FROM "NutriApp"."alimento" WHERE horario = $1 AND tipo = $2 ORDER BY RANDOM() LIMIT 1;';
    const result = await pool.query(query, [horario, tipo]); 
    return result.rows[0]; // Devuelve el primer alimento encontrado del tipo y horario entregados como argumento
}

app.get('/api/alimento', async (req, res) => {
    const horario = req.query.horario; // Obtiene el parámetro de consulta
    if (!horario) {
        return res.status(400).send('El parámetro "horario" es requerido');
    }
    try {
        const alimento = await obtenerAlimento(horario);
        if (!alimento) {
            return res.status(404).send('Alimento no encontrado');
        }
        res.json(alimento);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el alimento');
    }
});



app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});