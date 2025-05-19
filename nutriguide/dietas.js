import { protegerRuta, cerrarSesion } from './sesion.js';
protegerRuta();
window.cerrarSesion = cerrarSesion;

async function enviarAChatGPT(texto) {
    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mensaje: texto }),
      });
      const data = await response.json();
      console.log('Respuesta de la IA:', data.respuesta);
  
      document.getElementById('contenedor').innerHTML += `<p><b>IA:</b> ${data.respuesta}</p>`;
  
    } catch (error) {
      console.error('Error enviando al ChatGPT:', error);
    }
  }


async function preguntaGPT() {
  const paciente = JSON.parse(localStorage.getItem('pacienteAnamnesis'));
  if (!paciente) {
    alert("No hay paciente seleccionado.");
    return;
  }
  const campos = [
    { id: 'desayuno',            label: 'Desayuno' },
    { id: 'colacionManana',      label: 'Colación de la Mañana' },
    { id: 'almuerzo',            label: 'Almuerzo' },
    { id: 'colacionTarde',       label: 'Colación de la Tarde' },
    { id: 'once',                label: 'Once' },
    { id: 'cena',                label: 'Cena' },
  ];

  const partes = campos.map(({id, label}) => {
    const txt = document.getElementById(id).value.trim();
    return `${label}: ${txt || '[no especificado]'}`;
  });

  const recordatorio = partes.join('\n');

  if (partes.every(p => p.endsWith('[no especificado]'))) {
    alert("Describe al menos una de las comidas del recordatorio.");
    return;
  }
  const prompt = `
Eres un nutricionista chileno experto en sobrepeso, obesidad y alergias alimentarias. Tu tarea es generar un plan alimentario cumpliendo con requerimientos nutricionales diarios individualizados para un paciente.
Para ello, recibirás los datos del paciente y un recordatorio de 24 horas con lo que consumió.
Deberás convertir ese recordatorio en una dieta saludable, ajustando macros (Calorías/Prot/Carb/Lípidos) entre 90 %–110 %.

Paciente:
  Nombre: ${paciente.nombre} ${paciente.apellido}
  Requerimientos diarios:
    • Calorías:    ${paciente.calorias} kcal
    • Proteínas:   ${paciente.proteinas} g
    • Carbohidratos: ${paciente.carbohidratos} g
    • Lípidos:     ${paciente.lipidos} g

Recordatorio de 24 horas:
${recordatorio}

Deberás:
1. Seleccionar alimentos por horario (desayuno, colación mañana, almuerzo, colación tarde, once, cena).
2. Calcular totales diarios y adecuación (%) de cada macro.
3. Ajustar (reemplazos, factores, inserciones) hasta cumplir 90 %–110 % en todos los macros.
4. Solo emitir la planificación final cuando todas las adecuaciones estén en rango.

Salida esperada:
  “He convertido tu recordatorio de 24 horas, ${paciente.nombre} ${paciente.apellido}, en una dieta saludable. Acá tienes el detalle:
  Horario: Desayuno
  Alimentos: [fondo] + [acompañamiento] + [bebestible]
  … (etc, ver formato completo) …
  Tabla Resumen del Día
              Calorías  Prot.  Carb.  Lípidos
  Aporte      X        Y      Z      W
  Requerim.   ${paciente.calorias}  ${paciente.proteinas}  ${paciente.carbohidratos}  ${paciente.lipidos}
  % Adecuación  X/${paciente.calorias}×100 …”

  Reglas:
  - En tu respuesta, NO utilizar simbolos como "#" o "*", ya que se devuelve como texto plano.
  - En tu respuesta, que el texto salga justificado.
  - Si incluyes una tabla resumen del día, ordénala: centra columnas y filas para que la información sea más entendible.
  - NO emitas tu respuesta a no ser que TODOS los valores del % Adecuación esten entre 90 y 110%. De no lograr estos valores de adecuación, 
  recalcula con diferentes gramos de los alimentos, utiliza otros alimentos, hasta lograr el objetivo de adecuación. Una vez adecuados los valores, emite tu respuesta.
  - En tu respuesta, no muestres resultados preliminares, solo la dieta final con los % de adecuacion entre 90 y 110%, con la salida esperada que se te solicitó.
  `;
  document.getElementById('respuesta').innerText = "Transformando Recordatorio 24 hrs en su versión Saludable…";
  
  document.getElementById('btnDescargar').style.display = 'none';

  try {
    const resp = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mensaje: prompt })
    });
    if (!resp.ok) throw new Error(await resp.text());
    const { respuesta } = await resp.json();
    document.getElementById('respuesta').innerText = respuesta;
    document.getElementById('btnDescargar').style.display = 'block';
  } catch (err) {
    console.error('Error enviando al ChatGPT:', err);
    document.getElementById('respuesta').innerText = "Error al conectar con la IA";
  }
}

window.preguntaGPT = preguntaGPT;


import { Paciente } from './clases.js';
  async function preguntaAnamnesis() {
    const raw = JSON.parse(localStorage.getItem('pacienteAnamnesis'));
    if (!raw) {
      alert("No hay paciente seleccionado.");
      return;
    }
    const paciente = new Paciente(
      raw.id, raw.nutri_id, raw.nombre, raw.apellido, raw.rut,
      raw.peso, raw.altura, raw.sexo, raw.edad,
      raw.actFisica,
      raw.pliegueTricipital, raw.pliegueSubescapular,
      raw.pliegueSupraIliaco, raw.pliegueBicipital,
      raw.circunferenciaBraquial, raw.circunferenciaCintura,
      raw.necesidad, raw.calorias, raw.proteinas, raw.carbohidratos, raw.lipidos
    );

    const alergias       = document.getElementById('alergias').value.trim()            || '[no especificado]';
    const preferencias   = document.getElementById('preferencias-alimentarias').value.trim() || '[no especificado]';
    const contexto       = document.getElementById('anamnesis-social').value.trim()     || '[no especificado]';

    const prompt = `
Eres un nutricionista chileno experto en anamnesis y diseño de planes alimentarios.
Utiliza estos datos clínicos, antropométricos y sociales para hacer un diagnóstico breve y
proponer recomendaciones alimentarias concretas.
También, genera una dieta para 7 días para el siguiente paciente

Paciente:
  Nombre: ${paciente.nombre} ${paciente.apellido}
  IMC: ${Math.round(paciente.imc())} → ${paciente.clasificacionImc()}
  PCT: ${paciente.clasificacionPCT()}
  AMB: ${Math.round(paciente.amb())} cm² → ${paciente.clasificacionAMB()}
  CC: ${paciente.clasificacionCC()}
  GC: ${paciente.clasificacionGC()}
  calorias:  ${paciente.calorias}
  proteinas: ${paciente.proteinas}
  carbohidratos: ${paciente.carbohidratos}
  lipidos: ${paciente.lipidos}

Alergias alimentarias:
${alergias}

Preferencias/aversiónes culinarias:
${preferencias}

Contexto socioeconómico:
${contexto}

Deberás:
1. Hacer un diagnóstico nutricional basado en IMC, PCT, AMB, CC y GC.
2. Indicar cómo las alergias y preferencias pueden afectar la dieta.
3. Sugerir ajustes o pautas (hasta 3 puntos clave) para el plan de alimentación.
4. Crear una dieta que considere desayunos, colaciones, almuerzos, onces y cenas de 7 días. Para ello, deberás:
  -Seleccionar alimentos por horario (desayuno, colación mañana, almuerzo, colación tarde, once, cena).
  -Calcular totales diarios y adecuación (%) de cada macro.
  -Ajustar (reemplazos, factores, inserciones) hasta cumplir 90 %–110 % en todos los macros.
  -Solo emitir la planificación final cuando todas las adecuaciones estén en rango.
  Salida Esperada:
  Día 1
  Horario: Desayuno
  Alimentos: [fondo] + [acompañamiento] + [bebestible]
  … (etc, ver formato completo) …
  Tabla Resumen del Día
              Calorías  Prot.  Carb.  Lípidos
  Aporte      X        Y      Z      W
  Requerim.   ${paciente.calorias}  ${paciente.proteinas}  ${paciente.carbohidratos}  ${paciente.lipidos}
  % Adecuación  X/${paciente.calorias}×100 …”
  Día 2
  Alimentos: [fondo] + [acompañamiento] + [bebestible]
  … (etc, ver formato completo) …
  Tabla Resumen del Día
              Calorías  Prot.  Carb.  Lípidos
  Aporte      X        Y      Z      W
  Requerim.   ${paciente.calorias}  ${paciente.proteinas}  ${paciente.carbohidratos}  ${paciente.lipidos}
  % Adecuación  X/${paciente.calorias}×100 …”
  ... Continuar con los días siguientes
  Día 5
  Alimentos: [fondo] + [acompañamiento] + [bebestible]
  … (etc, ver formato completo) …
  Tabla Resumen del Día
              Calorías  Prot.  Carb.  Lípidos
  Aporte      X        Y      Z      W
  Requerim.   ${paciente.calorias}  ${paciente.proteinas}  ${paciente.carbohidratos}  ${paciente.lipidos}
  % Adecuación  X/${paciente.calorias}×100 …”
5. NO emitas tu respuesta a no ser que TODOS los valores del % Adecuación esten entre 90 y 110%. De no lograr estos valores de adecuación, 
  recalcula con diferentes gramos de los alimentos, utiliza otros alimentos, hasta lograr el objetivo de adecuación. Una vez adecuados los valores, emite tu respuesta.
6. En tu respuesta, no muestres resultados preliminares, solo la dieta final con los % de adecuacion entre 90 y 110%, con la salida esperada que se te solicitó.
7. Formatea la respuesta como un breve informe justificado en texto plano, sin símbolos especiales.

`;

    const out = document.getElementById('respuesta');
    out.innerText = "Analizando anamnesis y generando recomendaciones…";
    document.getElementById('btnDescargar').style.display = 'none';

    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: prompt })
      });
      if (!res.ok) throw new Error(await res.text());
      const { respuesta } = await res.json();
      out.innerText = respuesta;
      document.getElementById('btnDescargar').style.display = 'block';
    } catch (err) {
      console.error('Error enviando anamnesis a ChatGPT:', err);
      out.innerText = "Error al conectar con la IA";
    }
  }

  document.getElementById('botonAnamnesis')
          .addEventListener('click', preguntaAnamnesis);


  window.preguntaAnamnesis = preguntaAnamnesis;

async function fetchPlanJSON(prompt) {
  const res = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      model: "gpt-4",
      temperature: 0.2,
      messages: [{ role: "user", content: prompt }]
    })
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`API error ${res.status}: ${txt}`);
  }
  const { respuesta } = await res.json();

  const start = respuesta.indexOf('[');
  const end   = respuesta.lastIndexOf(']') + 1;
  if (start < 0 || end < 0) {
    console.error('Respuesta completa:', respuesta);
    throw new Error('No encontré un array JSON en la respuesta.');
  }
  return JSON.parse(respuesta.slice(start, end));
}


function renderPlan(plan, req) {
  let html = `<h1>Dieta Quincenal para ${req.nombre}</h1>`;

  for (const dia of plan) {
    html += `<div class="dietaGPT">
      <h2>Día ${dia.day}</h2>`;

    for (const comida of dia.meals) {
      html += `
        <h3>${comida.horario}</h3>
        <ul>
          ${comida.alimentos.map(a =>
            `<li>${a.gramos} g ${a.nombre} – $${a.precio}</li>`
          ).join('')}
        </ul>
        <p>${comida.preparacion}</p>
      `;
    }

    const A = req.calorias, B = req.proteinas,
          C = req.carbohidratos, D = req.lipidos;
    const X = dia.totales.calorias,   Y = dia.totales.proteinas,
          Z = dia.totales.carbohidratos, W = dia.totales.lipidos;

    html += `
      <table class="resumenDia">
        <tr>
          <th></th><th>Calorías</th><th>Prot.</th><th>Carb.</th><th>Lípidos</th>
        </tr>
        <tr>
          <td>Requerimientos</td>
          <td>${A}</td><td>${B}</td><td>${C}</td><td>${D}</td>
        </tr>
        <tr>
          <td>Aporte</td>
          <td>${X}</td><td>${Y}</td><td>${Z}</td><td>${W}</td>
        </tr>
        <tr>
          <td>% Adecuación</td>
          <td>${Math.round(100*X/A)}%</td>
          <td>${Math.round(100*Y/B)}%</td>
          <td>${Math.round(100*Z/C)}%</td>
          <td>${Math.round(100*W/D)}%</td>
        </tr>
      </table>
    </div>`;
  }

  document.getElementById('respuestaPlan').innerHTML = html;
}


export async function generatePlan() {
  const raw = JSON.parse(localStorage.getItem('pacienteSeleccionado'));
  if (!raw) return alert('Selecciona antes un paciente.');

  const req = {
    nombre:        `${raw.nombre} ${raw.apellido}`,
    calorias:      raw.calorias,
    proteinas:     raw.proteinas,
    carbohidratos: raw.carbohidratos,
    lipidos:       raw.lipidos
  };


const prompt = `
Devuélveme únicamente un ARRAY JSON de 15 objetos, uno por cada día (1 al 15).  
La respuesta DEBE:
- Comenzar exactamente con '[' y terminar exactamente con ']'.
- No incluir nada antes ni después (ni explicaciones, ni comentarios, ni comas de más).

Ejemplo de UN solo objeto (fuera del JSON).  
Sigue exactamente esta estructura para cada uno de los 15 días:

{
  "day": 1,
  "meals": [
    {
      "horario": "Desayuno",
      "alimentos": [
        { "nombre": "Pan amasado", "gramos": 60, "precio": 200 },
        { "nombre": "Mantequilla",    "gramos": 10, "precio":  50 },
        { "nombre": "Mermelada",      "gramos": 20, "precio":  30 },
        { "nombre": "Té con leche",   "gramos":200, "precio": 100 },
        { "nombre": "Plátano",        "gramos":100, "precio": 100 }
      ],
      "preparacion": "Untar el pan con mantequilla y mermelada. Servir con té con leche."
    },
    {
      "horario": "Almuerzo",
      "alimentos": [
        { "nombre": "Cazuela de vacuno", "gramos":400, "precio":1500 }
      ],
      "preparacion": "Preparar una cazuela con carne, verduras y caldo."
    },
    {
      "horario": "Once",
      "alimentos": [
        { "nombre": "Marraqueta",      "gramos": 60, "precio":150 },
        { "nombre": "Palta",           "gramos": 50, "precio":150 },
        { "nombre": "Queso fresco",    "gramos": 30, "precio":150 },
        { "nombre": "Café con leche",  "gramos":200, "precio":100 }
      ],
      "preparacion": "Tostar la marraqueta y cubrir con palta y queso. Acompañar con café con leche."
    },
    {
      "horario": "Cena",
      "alimentos": [
        { "nombre": "Atún en lata",    "gramos": 85, "precio":500 },
        { "nombre": "Papa cocida",     "gramos":150, "precio":100 },
        { "nombre": "Tomate",          "gramos":100, "precio":100 },
        { "nombre": "Mayonesa",        "gramos": 15, "precio": 50 },
        { "nombre": "Pan integral",    "gramos": 60, "precio":100 }
      ],
      "preparacion": "Mezclar atún, papa y tomate con mayonesa. Servir con pan integral."
    }
  ],
  "totales": {
    "calorias":    1900,
    "proteinas":     74,
    "carbohidratos":294,
    "lipidos":       70
  },
  "porcentajes": {
    "calorias":     95,
    "proteinas":   105,
    "carbohidratos":98,
    "lipidos":     100
  }
}

Ahora genera los 15 objetos completos (días 1 al 15), siguiendo exactamente esa estructura y cumpliendo estas reglas:

1. Calcula totales de macros y sus porcentajes sobre los requerimientos del paciente.  
2. **Todos** los porcentajes deben quedar entre 90% y 110%.  
3. Si un porcentaje está fuera de rango, ajusta las porciones o sustituye alimentos antes de devolver el JSON.  
4. Solo devuelve el ARRAY JSON de 15 objetos, sin nada más.  
5. Usa alimentos habituales de la población chilena.
`;


  document.getElementById('respuestaPlan').innerHTML = `<p>Cargando plan…</p>`;

  try {
    const plan = await fetchPlanJSON(prompt);
    renderPlan(plan, req);
  } catch (err) {
    document.getElementById('respuestaPlan')
      .innerHTML = `<p style="color:red">Error: ${err.message}</p>`;
  }
}

window.generatePlan = generatePlan;


window.addEventListener('DOMContentLoaded', () => {
          
          const usuario = JSON.parse(localStorage.getItem('usuario'));
          const paciente = JSON.parse(localStorage.getItem('pacienteSeleccionado'));
          const header = document.getElementById('encabezadoDieta');
      
          if (usuario && paciente) {
            header.innerHTML = `
              <h2 style="text-align: center; margin: 1rem 0;">
                ${usuario.nombre}, crea la dieta para ${paciente.nombre} ${paciente.apellido} acá
              </h2>
            `;
          } else {
            header.innerHTML = `
              <h2 style="text-align: center; margin: 1rem 0; color: #c00;">
                No hay usuario o paciente seleccionado.
              </h2>
            `;
          }
        });

        function printPDF() {
          const element = document.getElementById('contenedor');
          const opt = {
            margin:       0.5,
            filename:     'plan_dietario.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
          };
          html2pdf().set(opt).from(element).save();
        }

        document.getElementById('btnPDF').addEventListener('click', printPDF);

window.preguntaGPT  = preguntaGPT;
window.generarPlan  = generarPlan;
window.printPDF     = printPDF;