import { Paciente } from './clases.js';

const form = document.getElementById('formulario');
form.addEventListener('submit', enviarPaciente);

async function enviarPaciente(event) {
  event.preventDefault();

  try {

    const usuarioJSON = localStorage.getItem('usuario');
    if (!usuarioJSON) {
      throw new Error('Debes iniciar sesión antes de registrar un paciente.');
    }
    const usuarioData = JSON.parse(usuarioJSON);
    const nutriId = usuarioData.id;


    const nombre    = document.getElementById("nombre").value.trim();
    const apellido  = document.getElementById("apellido").value.trim();
    const rut       = document.getElementById("rut").value.trim();
    const edad      = parseInt(document.getElementById("edad").value, 10);
    const sexoEl    = document.querySelector('input[name="genero"]:checked');
    const actEl     = document.querySelector('input[name="actividadFisica"]:checked');
    const peso      = parseInt(document.getElementById("peso").value, 10);
    const altura    = parseInt(document.getElementById("altura").value, 10);
    const ccintura  = parseInt(document.getElementById("circunferenciacintura").value, 10);
    const cbrazo    = parseInt(document.getElementById("circunferenciabrazo").value, 10);
    const pTri      = parseFloat(document.getElementById("tricipital").value);
    const pSubesc   = parseFloat(document.getElementById("subescapular").value);
    const pSupra    = parseFloat(document.getElementById("suprailiaco").value);
    const pBici     = parseFloat(document.getElementById("bicipital").value);
    const necesidadEl = document.querySelector('input[name="necesidadPaciente"]:checked');

    if (!nombre || !apellido || !rut ||
        isNaN(edad) || isNaN(peso) || isNaN(altura) ||
        !sexoEl || !actEl || isNaN(ccintura) || isNaN(cbrazo) ||
        isNaN(pTri) || isNaN(pSubesc) || isNaN(pSupra) || isNaN(pBici) ||
        !necesidadEl) {
      throw new Error('Por favor completa todos los campos obligatorios.');
    }

    const sexo     = parseInt(sexoEl.value, 10);
    const actFis   = parseFloat(actEl.value);
    const necesidad= parseInt(necesidadEl.value, 10);


  const pacienteObj = new Paciente(
    null,          
    nutriId,       
    nombre,
    apellido,
    rut,
    peso,
    altura,
    sexo,
    edad,
    actFis,        
    pTri,          
    pSubesc,       
    pSupra,        
    pBici,         
    cbrazo,        
    ccintura,      
    necesidad      
  );


  const calorias       = pacienteObj.harrisBenedict();
  const proteinas      = Math.round(pacienteObj.proteinas());
  const carbohidratos  = Math.round(pacienteObj.carbohidratos());
  const lipidos        = Math.round(pacienteObj.lipidos());

  const pacienteData = {
    nutri_id:               nutriId,
    nombre,
    apellido,
    rut,
    peso,
    altura,
    sexo,
    edad,
    actFisica:              actFis,
    pliegueTricipital:      pTri,
    pliegueSubescapular:    pSubesc,
    pliegueSuprailiaco:     pSupra,
    pliegueBicipital:       pBici,
    circunferenciaBraquial: cbrazo,
    circunferenciaCintura:  ccintura,
    necesidad,
    calorias,
    proteinas,
    carbohidratos,
    lipidos
  };


    const resp = await fetch('http://localhost:3000/api/paciente', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(pacienteData),
    });

    if (!resp.ok) {
      const text = await resp.text();
      throw new Error(`Error al registrar paciente: ${text}`);
    }

    const nuevoPaciente = await resp.json();
    console.log('Paciente registrado:', nuevoPaciente);


    mostrarDivEmergente('Paciente registrado exitosamente.');
    form.reset();

  } catch (err) {
    console.error(err);
    mostrarDivEmergente(err.message);
  }
}

function mostrarDivEmergente(mensaje) {
  document.getElementById('mensaje').innerText = mensaje;
  document.getElementById('popup').style.display   = 'block';
  document.getElementById('overlay').style.display = 'block';
}
function cerrarDivEmergente() {
  document.getElementById('popup').style.display   = 'none';
  document.getElementById('overlay').style.display = 'none';
}
window.cerrarDivEmergente = cerrarDivEmergente;

