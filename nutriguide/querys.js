const { Pool } = require('pg');
// Crea una nueva instancia de Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432
});
async function ejecutarQuery(query, params) {
    const result = await pool.query(query, params);
    const a = result.rows[0];
    return new Alimento(a.id, a.horario, a.tipo, a.nombre, a.calorias, a.proteinas, a.carbohidratos, a.lipidos, a.precio, a.gramaje, a.descripcion);
}
async function obtenerAlimento(horario) {
    const response = await fetch(`http://localhost:3000/api/alimento?horario=${horario}`);
    if (!response.ok) {
        throw new Error('Error al obtener el alimento');
    }
    return await response.json();
}

async function obtenerAlimentoTipo(horario, tipo) {
    const response = await fetch(`http://localhost:3000/api/alimento?horario=${horario}&tipo=${tipo}`);
    if (!response.ok) {
        throw new Error('Error al obtener el alimento');
    }
    return await response.json();
}