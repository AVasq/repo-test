        async function verificarRutExistente(rut) {
            try {
                const response = await fetch('http://localhost:3000/verificarRut', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ rut }),
                });
                if (!response.ok) {
                    throw new Error('Error en la verificación del RUT');
                }
                return await response.json();
            } catch (error) {
                console.error('Error:', error);
            }
        }

        async function verificarCorreoExistente(correo) {
            try {
                const response = await fetch('http://localhost:3000/verificarCorreo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ correo }),
                });
                if (!response.ok) {
                    throw new Error('Error en la verificación del correo');
                }
                return await response.json();
            } catch (error) {
                console.error('Error:', error);
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

        async function enviarDatos(event) {
            event.preventDefault(); 
            let nombre = document.getElementById("nombre").value; 
            let apellido = document.getElementById("apellido").value; 
            let rut = document.getElementById("rut").value; 
            let correo = document.getElementById("correo").value; 
            let contraseña1 = document.getElementById("contraseña1").value; 
            let contraseña2 = document.getElementById("contraseña2").value; 
            let validaciones = true; //

            if (!validarNombre(nombre) || !validarApellido(apellido) || !validarRut(rut) || 
                !validarCorreo(correo) || !validarContrasena(contraseña1) || 
                !validarContraseñas(contraseña1, contraseña2)) {
                mostrarDivEmergente("Por favor, ingrese correctamente los datos.");
                return;
            }
            const rutData = await verificarRutExistente(rut);
            const correoData = await verificarCorreoExistente(correo);
            if (rutData.existe && correoData.existe) {
                mostrarDivEmergente("El RUT y el correo ya están registrados.");
                return;
            } else if (rutData.existe) {
                mostrarDivEmergente("El RUT ya está registrado.");
                return;
            } else if (correoData.existe) {
                mostrarDivEmergente("El correo ya está registrado.");
                return;
            }

            const usuarioData = await registrarUsuario(rut, nombre, apellido, correo, contraseña1);
            if (usuarioData) {
                mostrarDivEmergente("Usuario registrado exitosamente.");
            } else {
                mostrarDivEmergente("Error al registrar el usuario.");
            }
        }