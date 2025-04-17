

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
        return true;
    }
}


function validarApellido(apellido){
    if (apellido.trim() === ""){
        return false;
    } else {
        return true;
    }
}

/*Funcion estandar para validar Rut
validarRut = (rutIngresado) => {
    // Eliminar espacios y guiones
    rut = rutIngresado.replace(/\s+/g, '').replace(/-/, '');
    // Separar el número y el dígito verificador
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    // Validar que el cuerpo sea un número
    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }
    // Calcular el dígito verificador
    let suma = 0;
    let multiplicador = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const dvCalculado = 11 - (suma % 11);
    const dvFinal = dvCalculado === 10 ? 'K' : dvCalculado === 11 ? '0' : dvCalculado.toString();
    // Comparar el dígito verificador ingresado con el calculado
    return dv === dvFinal;
}*/

const validarRut = (rutIngresado) => {
    // Expresión regular para validar el formato del RUT
    const formatoValido = /^\d{1,2}\.\d{3}\.\d{3}-[\dK]$/;
    // Verificar si el RUT coincide con el formato válido
    if (!formatoValido.test(rutIngresado)) {
        return false; // Si no coincide, es inválido
    }
    // Eliminar espacios y guiones
    rut = rutIngresado.replace(/\s+/g, '').replace(/[-.]/g, '');
    // Separar el número y el dígito verificador
    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();
    // Validar que el cuerpo sea un número
    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }
    // Calcular el dígito verificador
    let suma = 0;
    let multiplicador = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    
    const dvCalculado = 11 - (suma % 11);
    const dvFinal = dvCalculado === 10 ? 'K' : dvCalculado === 11 ? '0' : dvCalculado.toString();
    
    // Comparar el dígito verificador ingresado con el calculado
    return dv === dvFinal;
}

//Validar contraseña

/*validarContrasena = (contrasena) => {
    if (contrasena.length <8){
        return false;
    }

// Ejemplo de uso
const contrasenaIngresada = "Ejemplo@123"; // Cambia este valor por la contraseña que deseas validar
if (validarContrasena(contrasenaIngresada)) {
    console.log("La contraseña es válida.");
} else {
    console.log("La contraseña es inválida.");
}
}*/

const validarContrasena = (contrasena) => {
    // Verificar longitud mínima
    if (contrasena.length < 8) {
        return false;
    }
    
    // Verificar que contenga al menos una letra mayúscula
    if (!/[A-Z]/.test(contrasena)) {
        return false;
    }
    
    // Verificar que contenga al menos una letra minúscula
    if (!/[a-z]/.test(contrasena)) {
        return false;
    }
    
    // Verificar que contenga al menos un número
    if (!/[0-9]/.test(contrasena)) {
        return false;
    }
    
    // Verificar que contenga al menos un carácter especial
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(contrasena)) {
        return false;
    }
    
    // Si todas las condiciones se cumplen, la contraseña es válida
    return true;
}

//Funcion estandar para validar correos electronicos

validarCorreo = (correo) => {
    // Expresión regular para validar el formato del correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(correo);
}
/* Ejemplo de uso
const correoIngresado = "ejemplo@dominio.com"; // Cambia este valor por el correo que deseas validar
if (validarCorreo(correoIngresado)) {
    console.log("El correo es válido.");
} else {
    console.log("El correo es inválido.");
}*/

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


function enviarDatos(){
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let rut = document.getElementById("rut").value;
    let correo = document.getElementById("correo").value;
    let contraseña1 = document.getElementById("contraseña1").value;
    let contraseña2 = document.getElementById("contraseña2").value;

    if (validarNombre(nombre) && validarApellido(apellido) && validarRut(rut) && validarCorreo(correo) && validarContrasena(contraseña1) && validarContraseñas(contraseña1,contraseña2)){
        //Continuar mañana
    } 


}