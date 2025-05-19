function mostrarDivEmergente(mensaje) {
    document.getElementById('mensaje').innerText = mensaje;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
function cerrarDivEmergente() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}