
import { iniciarSesion } from './sesion.js';  


const loginForm    = document.getElementById('loginForm');
const correoInput  = document.getElementById('correo');
const passInput    = document.getElementById('password');

loginForm.addEventListener('submit', iniciar);

async function iniciar(event) {
  event.preventDefault();

  const correo    = correoInput.value.trim();
  const contrasena= passInput.value;

  if (!validarCorreo(correo)) {
    mostrarDivEmergente('Formato de correo inválido.');
    return;
  }
  if (!validarContrasena(contrasena)) {
    mostrarDivEmergente('La contraseña debe tener mínimo 8 caracteres, incluyendo mayúscula, minúscula, número y símbolo.');
    return;
  }

  try {
    const resp = await fetch('http://localhost:3000/api/iniciarSesion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, contrasena })
    });
    const data = await resp.json();

    if (!resp.ok || !data.exito) {
      throw new Error(data.mensaje || 'Credenciales incorrectas.');
    }

    const usuarioResp = await fetch(`http://localhost:3000/api/usuario?correo=${encodeURIComponent(correo)}`);
    if (!usuarioResp.ok) {
      throw new Error('No se pudieron cargar los datos del usuario.');
    }
    const usuarioData = await usuarioResp.json();

    iniciarSesion(usuarioData);
    window.location.href = 'interfazUsuario.html';

  } catch (err) {
    console.error(err);
    mostrarDivEmergente(err.message);
  }
}


function validarCorreo(correo) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
}

function validarContrasena(contrasena) {
  if (contrasena.length < 8) return false;
  if (!/[A-Z]/.test(contrasena)) return false;
  if (!/[a-z]/.test(contrasena)) return false;
  if (!/[0-9]/.test(contrasena)) return false;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(contrasena)) return false;
  return true;
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


