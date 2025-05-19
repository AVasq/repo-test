

const mostrarValores = () => {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let rut = document.getElementById("rut").value;
    let correo = document.getElementById("correo").value;
    let contraseña1 = document.getElementById("contraseña1").value;
    let contenido = `
        <br>
        <p>${nombre} es tipo ${typeof nombre}</p>
        <p>${apellido} es tipo ${typeof apellido}</p>
        <p>${rut} es tipo ${typeof rut}</p>
        <p>${correo} es tipo ${typeof correo}</p>
        <p>${contraseña1} es tipo ${typeof contraseña1}</p>
        <br>
        </hr>
    `;
    
    document.getElementById("divDatos").innerHTML = contenido;
}

//Funciones genericas para validar Nombre y Apellido

function validarNombre(nombre){
    if (nombre.trim() === ""){
        return false;
    } else {
        if (nombre.length < 3){
            return false;}
    }   
    return true;
}


function validarApellido(apellido){
    if (apellido.trim() === ""){
        return false;
    } else {
        if (apellido.length < 3){
            return false;}
    }   
    return true;
}


const validarRut = (rutIngresado) => {

    const formatoValido = /^\d{1,2}\.\d{3}\.\d{3}-[\dK]$/;

    if (!formatoValido.test(rutIngresado)) {
        return false; 
    }

    rut = rutIngresado.replace(/\s+/g, '').replace(/[-.]/g, '');

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();

    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }

    let suma = 0;
    let multiplicador = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    const dvCalculado = 11 - (suma % 11);
    const dvFinal = dvCalculado === 10 ? 'K' : dvCalculado === 11 ? '0' : dvCalculado.toString();

    return dv === dvFinal;
}

const validarContrasena = (contrasena) => {

    if (contrasena.length < 8) {
        return false;
    }
    
    if (!/[A-Z]/.test(contrasena)) {
        return false;
    }
    
    if (!/[a-z]/.test(contrasena)) {
        return false;
    }
    
    if (!/[0-9]/.test(contrasena)) {
        return false;
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(contrasena)) {
        return false;
    }
    
    return true;
}



validarCorreo = (correo) => {

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
}

function validarContraseñas(contraseña1, contraseña2){
    if (contraseña1.trim() === "" || contraseña2.trim() === ""){
        return false;
    } else {
        if (contraseña1 === contraseña2){
            return true;
        } else {
            return false;
        }
    }
}

function pruebas(){
    let rut = document.getElementById("rut").value;
    let correo = document.getElementById("correo").value;
    let contraseña1 = document.getElementById("contraseña1").value;
    let contraseña2 = document.getElementById("contraseña2").value;
    
    let rutValido = validarRut(rut);
    let correoValido = validarCorreo(correo);
    let contraseñaValida = validarContrasena(contraseña1);
    
    let cadena = "";
    
    if (rutValido){
        cadena +=`<p>Rut Valido</p>`;
    } else {
        cadena +=`<p>Rut Invalido</p>`
    }

    if (correoValido){
        cadena +=`<p>Correo Valido</p>`;
    } else {
        cadena +=`<p>Correo Invalido</p>`
    }

    if (contraseñaValida){
        cadena +=`<p>Contraseña Valida</p>`;
    } else {
        cadena +=`<p>Contraseña Invalida</p>`
    }

    if (contraseña1.trim() === "" || contraseña2.trim() === ""){
        cadena += `<p>Favor rellene los dos campos de contraseña</p>`;
    } else {
        if (contraseña1 === contraseña2){
            cadena +=`<p>Contraseñas Iguales</p>`;
        } else {
            cadena +=`<p>Contraseñas Distintas</p>`
        }
    }
    

    document.getElementById("prueba").innerHTML = cadena;

}

async function iniciarSesion(event) {
    event.preventDefault(); 
    let correo = document.getElementById("correo").value;
    let contrasena = document.getElementById("password").value;

    if (!validarCorreo(correo)) {
        mostrarDivEmergente("Correo inválido.");
        return;
    }
    if (!validarContrasena(contrasena)) {
        mostrarDivEmergente("Contraseña inválida.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/api/iniciarSesion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ correo, contrasena }),
        });
        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }
        const data = await response.json();
        if (data.exito) {
            alert("Inicio de sesion exitoso");
            mostrarDivEmergente("Inicio de sesión exitoso.");
        } else {
            mostrarDivEmergente("Credenciales incorrectas.");
        }
    } catch (error) {
        console.error(error);
        mostrarDivEmergente("Error en el servidor. Intenta más tarde.");
    }
}

function mostrarDivEmergente(mensaje) {
    document.getElementById('mensaje').innerText = mensaje;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}
function cerrarDivEmergente() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

