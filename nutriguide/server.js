require('dotenv').config();

const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');


app.use(cors());


app.use(express.json());

const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432
});

async function obtenerAlimentoPorHorarioYPlato(horario, plato) {
    const sql = `
      SELECT * 
      FROM "NutriApp"."alimento"
      WHERE horario = $1 AND plato = $2
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const { rows } = await pool.query(sql, [horario, plato]);
    return rows[0] || null;
  }
  
  async function obtenerAlimentoPorHorarioYPlatoYTipoExcluido(horario, plato, tipoExcluido) {
    const sql = `
      SELECT * 
      FROM "NutriApp"."alimento"
      WHERE horario = $1 
        AND plato = $2 
        AND tipo <> $3
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const { rows } = await pool.query(sql, [horario, plato, tipoExcluido]);
    return rows[0] || null;
  }
  
  async function obtenerAlimentoPorHorarioYPlatoYTipo(horario, plato, tipo) {
    const sql = `
      SELECT * 
      FROM "NutriApp"."alimento"
      WHERE horario = $1 
        AND plato = $2 
        AND tipo = $3
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const { rows } = await pool.query(sql, [horario, plato, tipo]);
    return rows[0] || null;
  }
  
  async function obtenerAlimentoPorHorarioPlatoYTipos(horarios, plato, tiposPermitidos, usados) {
    const sql = `
      SELECT * 
      FROM "NutriApp"."alimento"
      WHERE horario = ANY($1) 
        AND plato   = $2
        AND tipo    = ANY($3)
        AND nombre <> ALL($4)
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const { rows } = await pool.query(sql, [horarios, plato, tiposPermitidos, usados]);
    return rows[0] || null;
  }

  async function obtenerAlimentoPorHorarioYCategoria(horario, categoria) {
    const sql = `
      SELECT *
      FROM "NutriApp"."alimento"
      WHERE horario = $1
        AND categoria = $2
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const { rows } = await pool.query(sql, [horario, categoria]);
    return rows[0] || null;
  }
  
  async function obtenerAlimentosDesayuno() {

    const fondo = await obtenerAlimentoPorHorarioYPlato('Desayuno', 'Fondo');
    if (!fondo) throw new Error('No hay fondo para el desayuno en la BD');
  
    let acompanamiento = await obtenerAlimentoPorHorarioYPlato('Desayuno', 'Acompañamiento');
    if (!acompanamiento) {
      console.warn('Acompañamiento de desayuno no encontrado; usando fondo como acompañamiento');
      acompanamiento = fondo;
    }
  
    const bebestible = (fondo.tipo === 'Lácteo' || acompanamiento.tipo === 'Lácteo')
      ? await obtenerAlimentoPorHorarioYPlatoYTipoExcluido('Cualquiera', 'Bebestible', 'Lácteo')
      : await obtenerAlimentoPorHorarioYPlato('Cualquiera', 'Bebestible');
  
    if (!bebestible) throw new Error('No se encontró bebestible para el desayuno');
  
    return { fondo, acompanamiento, bebestible };
  }
  
  async function obtenerAlimentosColacionManana() {
 
    let fondo = await obtenerAlimentoPorHorarioYPlato('Colacion', 'Fondo');
    if (!fondo) {
      console.warn('No hay fondo para la colación de la mañana; devolviendo null completo');
      return null;
    }
  

    let acompanamiento = await obtenerAlimentoPorHorarioYPlato('Colacion', 'Acompañamiento');
    if (!acompanamiento) {
      console.warn('Acompañamiento mañana no encontrado; usando fondo');
      acompanamiento = fondo;
    }
  
    let fruta = await obtenerAlimentoPorHorarioYPlatoYTipo('Cualquiera', 'Postre', 'Fruta');
    if (!fruta) {
      console.warn('No se encontró fruta; usando acompañamiento como fruta');
      fruta = acompanamiento;
    }
  

    let bebestible = (fondo.tipo === 'Lácteo' || acompanamiento.tipo === 'Lácteo')
      ? await obtenerAlimentoPorHorarioYPlatoYTipoExcluido('Cualquiera', 'Bebestible', 'Lácteo')
      : await obtenerAlimentoPorHorarioYPlatoYTipoExcluido('Cualquiera', 'Bebestible', fondo.tipo);
  
    if (!bebestible) {
      console.warn('No se encontró bebestible; usando fondo como bebestible');
      bebestible = fondo;
    }
  
    return { fondo, acompanamiento, fruta, bebestible };
  }
  
  async function obtenerAlimentosAlmuerzo(tipo) {

    const entrada = await obtenerAlimentoPorHorarioYPlato('Almuerzo', 'Entrada');
    if (!entrada) throw new Error('No hay entrada para el almuerzo');
    let fondo = null;
    if (tipo) {
      fondo = await obtenerAlimentoPorHorarioYPlatoYTipo('Almuerzo', 'Fondo', tipo);
    }
    if (!fondo) {
      console.warn(`No se encontró fondo de tipo "${tipo}", pidiendo uno aleatorio`);
      fondo = await obtenerAlimentoPorHorarioYPlato('Almuerzo', 'Fondo');
    }
  
    let acompanamiento = null;
    if (fondo.acompanamiento === 'si') {
      acompanamiento = await obtenerAlimentoPorHorarioYPlato('Almuerzo', 'Acompañamiento');
    }
  
    const tipoPostre = Math.random() < 0.7 ? 'Fruta' : 'Lácteo';
    let postre = await obtenerAlimentoPorHorarioYPlatoYTipo('Cualquiera', 'Postre', tipoPostre);
    if (!postre) {
      postre = await obtenerAlimentoPorHorarioYPlato('Cualquiera', 'Postre');
    }
  
    let bebestible = await obtenerAlimentoPorHorarioYPlatoYTipoExcluido('Cualquiera', 'Bebestible', 'Lácteo');
    if (!bebestible) {
      bebestible = await obtenerAlimentoPorHorarioYPlato('Cualquiera', 'Bebestible');
    }
  
    return { entrada, fondo, acompanamiento, postre, bebestible };
  }  
    
  async function obtenerAlimentosColacionTarde() {
    const prohibidos = ['Huevo Duro','Atún en agua','Quesillo'];
    const sql = `
      SELECT * 
      FROM "NutriApp"."alimento"
      WHERE (horario = 'Colacion' OR horario = 'Cualquiera')
        AND plato IN ('Fondo','Acompañamiento','Postre')
        AND nombre <> ALL($1)
      ORDER BY RANDOM()
      LIMIT 1;
    `;
    const { rows } = await pool.query(sql, [prohibidos]);
    if (rows.length === 0) return null;
    return rows[0];
  }
  
  async function obtenerAlimentosOnce(usados) {
    const tiposFondo = ['Lácteo','Ave','Huevo'];
    const fondo = await obtenerAlimentoPorHorarioPlatoYTipos(['Once','Colacion','Desayuno'], 'Fondo', tiposFondo, usados);
    const tiposAcom = tiposFondo.filter(t => t !== (fondo && fondo.tipo));
    const acompanamiento = await obtenerAlimentoPorHorarioPlatoYTipos(['Once','Colacion','Desayuno'], 'Acompañamiento', tiposAcom, usados);
    return { fondo, acompanamiento };
  }
  
  async function obtenerAlimentosCena() {
    const fondo = await obtenerAlimentoPorHorarioYPlato('Cena', 'Fondo');
    const acompanamiento = await obtenerAlimentoPorHorarioYPlatoYTipoExcluido('Cena', 'Acompañamiento', fondo ? fondo.tipo : '');
    return { fondo, acompanamiento };
  }
  
  
  app.get('/api/alimento/desayuno', async (req, res) => {
    try {
      const datos = await obtenerAlimentosDesayuno();
      res.json(datos);
    } catch (err) {
      console.error('Error en /api/alimento/desayuno:', err.message);
      res.status(500).send('Error al cargar desayuno');
    }
  });
  
  app.get('/api/alimento/colacionManana', async (req, res) => {
    try {
      const datos = await obtenerAlimentosColacionManana();
      res.json(datos);
    } catch (err) {
      console.error('Error en /api/alimento/colacionManana:', err.message);
      res.status(500).send('Error al cargar colación mañana');
    }
  });

    app.get('/api/alimento/almuerzo', async (req, res) => {
      const { tipo } = req.query;
      if (!tipo) return res.status(400).send('Falta parámetro tipo');
      try {
        const datos = await obtenerAlimentosAlmuerzo(tipo);          
        res.json(datos);
      } catch (err) {
        console.error('Error en /api/alimento/almuerzo:', err.message);
        res.status(500).send('Error al cargar almuerzo');
      }
    });
  
  app.get('/api/alimento/colacionTarde', async (req, res) => {
    try {
      const dato = await obtenerAlimentosColacionTarde();
      if (!dato) return res.status(404).send('No hay colación tarde');
      res.json(dato);
    } catch (err) {
      console.error('Error en /api/alimento/colacionTarde:', err.message);
      res.status(500).send('Error al cargar colación tarde');
    }
  });
  
  app.get('/api/alimento/once', async (req, res) => {
    try {
      const datos = await obtenerAlimentosOnce([]);
      res.json(datos);
    } catch (err) {
      console.error('Error en /api/alimento/once:', err.message);
      res.status(500).send('Error al cargar once');
    }
  });
  
  app.get('/api/alimento/cena', async (req, res) => {
    try {
      const datos = await obtenerAlimentosCena();
      res.json(datos);
    } catch (err) {
      console.error('Error en /api/alimento/cena:', err.message);
      res.status(500).send('Error al cargar cena');
    }
  });
  

  app.post("/api/chat", async (req, res) => {
  try {

    let userMessages;
    if (typeof req.body.mensaje === "string") {
      userMessages = [{ role: "user", content: req.body.mensaje }];
    } else if (Array.isArray(req.body.messages)) {
      userMessages = req.body.messages;
    } else {
      return res.status(400).json({ error: "Falta campo 'mensaje' o 'messages' en el body" });
    }


    const completion = await openai.chat.completions.create({
      model: req.body.model || "gpt-4o-mini",
      messages: userMessages,
      stream: false  
    });


    res.json({ respuesta: completion.choices[0].message.content });
  } catch (err) {
    console.error("Error llamando a OpenAI:", err);
    res.status(500).json({ error: "Error llamando a la IA" });
  }
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

async function obtenerAlimentoPorHorarioYPlato(horario, plato) {
    const query = 'SELECT * FROM "NutriApp"."alimento" WHERE horario = $1 AND plato = $2 ORDER BY RANDOM() LIMIT 1;';
    const result = await pool.query(query, [horario, plato]);
    return result.rows[0]; 
}

async function obtenerAlimentoPorHorarioYPlatoDiferenteTipo(horario, plato, tipoExcluido) {
    const query = 'SELECT * FROM "NutriApp"."alimento" WHERE horario = $1 AND plato = $2 AND tipo <> $3 ORDER BY RANDOM() LIMIT 1;';
    const result = await pool.query(query, [horario, plato, tipoExcluido]);
    return result.rows[0]; 
}

async function obtenerAlimentoPorHorarioYPlatoYTipoExcluido(horario, plato, tipoExcluido) {
    const query = 'SELECT * FROM "NutriApp"."alimento" WHERE horario = $1 AND plato = $2 AND tipo <> $3 ORDER BY RANDOM() LIMIT 1;';
    const result = await pool.query(query, [horario, plato, tipoExcluido]);
    return result.rows[0]; 
}

async function obtenerAlimentoPorHorarioYPlatoYTipo(horario, plato, tipo) {
    const query = 'SELECT * FROM "NutriApp"."alimento" WHERE horario = $1 AND plato = $2 AND tipo = $3 ORDER BY RANDOM() LIMIT 1;';
    const result = await pool.query(query, [horario, plato, tipo]);
    return result.rows[0];
}

async function obtenerAlimentoPorHorarioPlatoYTipos(horarios, plato, tiposPermitidos, alimentosSeleccionados) {
    const query = `
        SELECT * FROM "NutriApp"."alimento"
        WHERE horario = ANY($1) AND plato = $2 AND tipo = ANY($3) AND nombre <> ANY($4)
        ORDER BY RANDOM() LIMIT 1;
    `;
    const result = await pool.query(query, [horarios, plato, tiposPermitidos, alimentosSeleccionados]);
    return result.rows[0] || null; 
}


async function registrarUsuario(rut, nombre, apellido, correo, contrasena) {
    const query = `
      INSERT INTO "NutriApp"."usuarios"
        (rut, nombre, apellido, correo, contrasena, rol_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [rut, nombre, apellido, correo, contrasena, 2]; 
    const result = await pool.query(query, values);
    return result.rows[0];
}

app.get('/api/alimento', async (req, res) => {
  const { horario, tipo, categoria } = req.query;

  if (!horario) {
    return res.status(400).send('El parámetro "horario" es requerido');
  }

  try {
    let alimento;

    if (tipo) {
      alimento = await obtenerAlimentoTipo(horario, tipo);
    } else if (categoria) {
      alimento = await obtenerAlimentoPorHorarioYCategoria(horario, categoria);
    } else {
      alimento = await obtenerAlimento(horario);
    }

    if (!alimento) {
      return res.status(404).send('Alimento no encontrado');
    }

    res.json(alimento);
  } catch (error) {
    console.error('Error en /api/alimento:', error);
    res.status(500).send('Error al obtener el alimento');
  }
});




app.post('/verificarRut', async (req, res) => {
    const { rut } = req.body; 
    try {
        const query = 'SELECT * FROM "NutriApp"."usuarios" WHERE rut = $1';
        const result = await pool.query(query, [rut]);
        if (result.rows.length > 0) {
            return res.status(200).json({ existe: true }); 
        } else {
            return res.status(200).json({ existe: false }); 
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
});


app.post('/verificarCorreo', async (req, res) => {
    const { correo } = req.body; 
    try {
        const query = 'SELECT * FROM "NutriApp"."usuarios" WHERE correo = $1';
        const result = await pool.query(query, [correo]);
        if (result.rows.length > 0) {
            return res.status(200).json({ existe: true }); 
        } else {
            return res.status(200).json({ existe: false }); 
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
});


app.post('/registrarUsuario', async (req, res) => {
  const { rut, nombre, apellido, correo, contrasena } = req.body;
  try {
    const saltRounds = 10; 
    const hash = await bcrypt.hash(contrasena, saltRounds);
    const query = `
      INSERT INTO "NutriApp"."usuarios"
        (rut, nombre, apellido, correo, contrasena, rol_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
    const values = [rut, nombre, apellido, correo, hash, 2];
    const result = await pool.query(query, values);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});


app.post('/api/iniciarSesion', async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const query = 'SELECT * FROM "NutriApp"."usuarios" WHERE correo = $1';
    const result = await pool.query(query, [correo]);

    if (result.rows.length === 0) {
      return res.status(401).json({ exito: false, mensaje: 'Usuario no encontrado' });
    }
    const usuario = result.rows[0];
    const match = await bcrypt.compare(contrasena, usuario.contrasena.trim());
    if (!match) {
      return res.status(401).json({ exito: false, mensaje: 'Contraseña incorrecta' });
    }

    return res.status(200).json({ exito: true, mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
});



app.get('/api/usuario', async (req, res) => {
    const { correo } = req.query;
    try {
        const query = 'SELECT * FROM "NutriApp"."usuarios" WHERE correo = $1';
        const result = await pool.query(query, [correo]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const usuario = result.rows[0];
        res.status(200).json(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
});


app.post('/api/paciente', async (req, res) => {
    const {
  nutri_id, nombre, apellido, rut,
  peso, altura, sexo, edad, actFisica,
  pliegueTricipital, pliegueSubescapular,
  pliegueSuprailiaco, pliegueBicipital,
  circunferenciaBraquial, circunferenciaCintura,
  necesidad,
  calorias, proteinas, carbohidratos, lipidos
} = req.body;
    try {
        const query = `
            INSERT INTO "NutriApp"."paciente"
              (nutri_id, nombre, apellido, rut,
              peso, altura, sexo, edad, actFisica,
              pliegueTricipital, pliegueSubescapular,
              pliegueSuprailiaco, pliegueBicipital,
              circunferenciaBraquial, circunferenciaCintura,
              necesidad,
              calorias, proteinas, carbohidratos, lipidos)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
            RETURNING *;`;
        const values = [
          nutri_id, nombre, apellido, rut,
          peso, altura, sexo, edad, actFisica,
          pliegueTricipital, pliegueSubescapular,
          pliegueSuprailiaco, pliegueBicipital,
          circunferenciaBraquial, circunferenciaCintura,
          necesidad,
          calorias, proteinas, carbohidratos, lipidos
        ];
    const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el paciente' });
    }
});


app.get('/api/paciente', async (req, res) => {
    const { nutri_id } = req.query; 
    try {
        const query = 'SELECT * FROM "NutriApp"."paciente" WHERE nutri_id = $1';
        const result = await pool.query(query, [nutri_id]);
        res.status(200).json(result.rows); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la consulta a la base de datos' });
    }
});

// PUT /api/paciente/:id → actualiza un paciente
app.put('/api/paciente/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const {
    peso, altura, sexo, edad, actFisica,
    pliegueTricipital, pliegueSubescapular, pliegueSuprailiaco, pliegueBicipital,
    circunferenciaBraquial, circunferenciaCintura,
    necesidad
  } = req.body;

  try {
    const query = `
      UPDATE "NutriApp"."paciente"
      SET
        peso                = $1,
        altura              = $2,
        sexo                = $3,
        edad                = $4,
        actFisica           = $5,
        pliegueTricipital   = $6,
        pliegueSubescapular = $7,
        pliegueSuprailiaco  = $8,
        pliegueBicipital    = $9,
        circunferenciaBraquial = $10,
        circunferenciaCintura  = $11,
        necesidad           = $12
      WHERE id = $13
      RETURNING *;
    `;
    const values = [
      peso, altura, sexo, edad, actFisica,
      pliegueTricipital, pliegueSubescapular, pliegueSuprailiaco, pliegueBicipital,
      circunferenciaBraquial, circunferenciaCintura,
      necesidad,
      id
    ];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error actualizando paciente:', err);
    res.status(500).json({ error: 'Error al actualizar el paciente' });
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
