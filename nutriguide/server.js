
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
    return result.rows[0];
}

async function obtenerAlimentoTipo(horario, tipo) {
    const query = 'SELECT * FROM "NutriApp"."alimento" WHERE horario = $1 AND tipo = $2 ORDER BY RANDOM() LIMIT 1;';
    const result = await pool.query(query, [horario, tipo]); 
    return result.rows[0];
}

app.get('/api/alimento', async (req, res) => {
    const { horario, tipo } = req.query;
    
    if (!horario) {
        return res.status(400).send('El parámetro "horario" es requerido');
    }
    
    try {
        let alimento;
        // Si se envía el parámetro "tipo", se usa la función con filtro por tipo
        if (tipo) {
            alimento = await obtenerAlimentoTipo(horario, tipo);
        } else {
            alimento = await obtenerAlimento(horario);
        }
        
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
