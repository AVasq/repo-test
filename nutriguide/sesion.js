export function iniciarSesion(usuarioData) {
  localStorage.setItem('usuario', JSON.stringify(usuarioData));
}
  
export function cerrarSesion() {
  localStorage.removeItem('usuario');
  localStorage.removeItem('pacienteSeleccionado');
  window.location.href = 'login.html';
}
  
export function protegerRuta() {
  if (!localStorage.getItem('usuario')) {
    window.location.href = 'login.html';
  }
}