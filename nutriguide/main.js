
/*
async function insertarDiv() {
    
    try {
        let data3 = await obtenerAlimento('Desayuno'); // Consulta para desayuno
        let desayuno = new Alimento(data3.id, data3.horario, data3.tipo, data3.nombre, data3.calorias, data3.proteinas, data3.carbohidratos, data3.lipidos, data3.precio, data3.gramaje, data3.descripcion);
        
        let data4 = await obtenerAlimento('Colacion'); // Consulta para colacion Mañana
        let colacionManana = new Alimento(data4.id, data4.horario, data4.tipo, data4.nombre, data4.calorias, data4.proteinas, data4.carbohidratos, data4.lipidos, data4.precio, data4.gramaje, data4.descripcion);
        
        // Obtiene un alimento para el almuerzo
        let data = await obtenerAlimento('Almuerzo'); // Consulta para almuerzo
        let almuerzo = new Alimento(data.id, data.horario, data.tipo, data.nombre, data.calorias, data.proteinas, data.carbohidratos, data.lipidos, data.precio, data.gramaje, data.descripcion);
        
        let data5 = await obtenerAlimento('Colacion'); // Consulta para colacion Tarde
        let colacionTarde = new Alimento(data5.id, data5.horario, data5.tipo, data5.nombre, data5.calorias, data5.proteinas, data5.carbohidratos, data5.lipidos, data5.precio, data5.gramaje, data5.descripcion);
        
        let data6 = await obtenerAlimento('Once'); // Consulta para once
        let once = new Alimento(data6.id, data6.horario, data6.tipo, data6.nombre, data6.calorias, data6.proteinas, data6.carbohidratos, data6.lipidos, data6.precio, data6.gramaje, data6.descripcion);
        
        // Obtiene un alimento para la cena
        let data2 = await obtenerAlimento('Cena'); // Consulta para cena
        let cena = new Alimento(data2.id, data2.horario, data2.tipo, data2.nombre, data2.calorias, data2.proteinas, data2.carbohidratos, data2.lipidos, data2.precio, data2.gramaje, data2.descripcion);
        

        // Muestra los alimentos en el contenedor
        document.getElementById("contenedor").innerHTML = `
            <h3>${desayuno.horario}</h3>
            <h1>${desayuno.nombre}</h1>
            <h2>Calorías: ${desayuno.calorias} kcal, Proteínas: ${desayuno.proteinas} g, Carbohidratos: ${desayuno.carbohidratos} g, Lípidos: ${desayuno.lipidos} g</h2>
            <br>
            <h3>${colacionManana.horario}</h3>
            <h1>${colacionManana.nombre}</h1>
            <h2>Calorías: ${colacionManana.calorias} kcal, Proteínas: ${colacionManana.proteinas} g, Carbohidratos: ${colacionManana.carbohidratos} g, Lípidos: ${colacionManana.lipidos} g</h2>
            <br>
            <hr>
            <h3>${almuerzo.horario}</h3>
            <h1>${almuerzo.nombre}</h1>
            <h2>Calorías: ${almuerzo.calorias} kcal, Proteínas: ${almuerzo.proteinas} g, Carbohidratos: ${almuerzo.carbohidratos} g, Lípidos: ${almuerzo.lipidos} g</h2>
            <br>
            <hr>
            <h3>${colacionTarde.horario}</h3>
            <h1>${colacionTarde.nombre}</h1>
            <h2>Calorías: ${colacionTarde.calorias} kcal, Proteínas: ${colacionTarde.proteinas} g, Carbohidratos: ${colacionTarde.carbohidratos} g, Lípidos: ${colacionTarde.lipidos} g</h2>
            <br>
            <hr>
            <h3>${once.horario}</h3>
            <h1>${once.nombre}</h1>
            <h2>Calorías: ${once.calorias} kcal, Proteínas: ${once.proteinas} g, Carbohidratos: ${once.carbohidratos} g, Lípidos: ${once.lipidos} g</h2>
            <br>
            <hr>
            <h3>${cena.horario}</h3>
            <h1>${cena.nombre}</h1>
            <h2>Calorías: ${cena.calorias} kcal, Proteínas: ${cena.proteinas} g, Carbohidratos: ${cena.carbohidratos} g, Lípidos: ${cena.lipidos} g</h2>
            <br>
            <hr>
        `;
    } catch (error) {
        console.error(error);
        document.getElementById("contenedor").innerHTML = `<h2>Error al obtener el alimento</h2>`;
    }
}*/

async function crearDia(param){
    try {
        let data3 = await obtenerAlimento('Desayuno'); // Consulta para desayuno
        let desayuno = new Alimento(data3.id, data3.horario, data3.tipo, data3.nombre, data3.calorias, data3.proteinas, data3.carbohidratos, data3.lipidos, data3.precio, data3.gramaje, data3.descripcion);
        
        let data4 = await obtenerAlimento('Colacion'); // Consulta para colacion Mañana
        let colacionManana = new Alimento(data4.id, data4.horario, data4.tipo, data4.nombre, data4.calorias, data4.proteinas, data4.carbohidratos, data4.lipidos, data4.precio, data4.gramaje, data4.descripcion);
        
        // Obtiene un alimento para el almuerzo
        let data = await obtenerAlimentoTipo('Almuerzo', param); // Consulta para almuerzo
        let almuerzo = new Alimento(data.id, data.horario, data.tipo, data.nombre, data.calorias, data.proteinas, data.carbohidratos, data.lipidos, data.precio, data.gramaje, data.descripcion);
        
        let data5 = await obtenerAlimento('Colacion'); // Consulta para colacion Tarde
        let colacionTarde = new Alimento(data5.id, data5.horario, data5.tipo, data5.nombre, data5.calorias, data5.proteinas, data5.carbohidratos, data5.lipidos, data5.precio, data5.gramaje, data5.descripcion);
        
        let data6 = await obtenerAlimento('Once'); // Consulta para once
        let once = new Alimento(data6.id, data6.horario, data6.tipo, data6.nombre, data6.calorias, data6.proteinas, data6.carbohidratos, data6.lipidos, data6.precio, data6.gramaje, data6.descripcion);
        
        // Obtiene un alimento para la cena
        let data2 = await obtenerAlimento('Cena'); // Consulta para cena
        let cena = new Alimento(data2.id, data2.horario, data2.tipo, data2.nombre, data2.calorias, data2.proteinas, data2.carbohidratos, data2.lipidos, data2.precio, data2.gramaje, data2.descripcion);
        
        let data7 = await obtenerAlimento('Ensalada'); // Consulta para la entrada del almuerzo
        let entrada = new Alimento(data7.id, data7.horario, data7.tipo, data7.nombre, data7.calorias, data7.proteinas, data7.carbohidratos, data7.lipidos, data7.precio, data7.gramaje, data7.descripcion);
        
        let data8 = await obtenerAlimento('Postre'); // Consulta para el postre del almuerzo
        let postre = new Alimento(data8.id, data8.horario, data8.tipo, data8.nombre, data8.calorias, data8.proteinas, data8.carbohidratos, data8.lipidos, data8.precio, data8.gramaje, data8.descripcion);
        
        let dia = new Dia(desayuno, colacionManana, entrada, almuerzo, postre, colacionTarde, once, cena);
        return dia;

    } catch (error) {
        console.error(error);
        console.log("Error al obtener el dia");
    }
}

//Algoritmo de Fisher-Yates para mezclar lista base:
function mezclarArray(array) {
    let copia = array.slice(); // Copiamos el array original
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]]; // Intercambia elementos
    }
    return copia;
}
  
//Funcion para generar matriz a iterar:
function generarMatriz(filas, listaBase) {
    const matriz = [];
    for (let i = 0; i < filas; i++) {
      const filaAleatoria = mezclarArray(listaBase);
      matriz.push(filaAleatoria);
    }
    return matriz;
}



//Funcion para generar lista con alimentos para todo el mes

async function listaMes() {
    try {
        let mes = [];
        const listaBase = ['Leguminosas', 'Vacuno', 'Ave', 'Acompañamiento', 'Pescado', 'Sopa', 'Pasta'];
        const listaMezclada = mezclarArray(listaBase);
        const matriz = generarMatriz(4, listaMezclada);
        //Iterar matriz:
        const tiposAlmuerzo = matriz.flat();
        // Iterar sobre cada tipo de almuerzo en el array aplanado
        for (let tipoAlmuerzo of tiposAlmuerzo) {
            let dia = await crearDia(tipoAlmuerzo); // Pasar el tipo de almuerzo a la función crearDia
            //Aca va la funcion que evaluara si el dia cumple la adecuacion, dentro de un (while !adecuacion)
            mes.push(dia); // Agregar el día a la lista de días
        }
        return mes;
    } catch (error) {
        console.error(error);
        console.log("Error al generar lista de los alimentos del mes");
    }
}

//funcion para insertar la info de la lista mes en divs individuales dentro del dom html
async function insertarDivs() {
    try {
        // Leer lista mes:
        let lista = await listaMes(); // Llama a la función para obtener la lista de alimentos del mes
        let contenedor = document.getElementById("contenedor");
        contenedor.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos divs
        // Iterar sobre la lista de días
        lista.forEach((dia, index) => {
            contenedor.innerHTML += `
                <div class="dia">
                    <h2>Día ${index + 1}</h2>
                    <h3>Desayuno: ${dia.desayuno.nombre}</h3>
                    <p>${dia.desayuno.descripcionNutricional()}</p>
                    
                    <h3>Colacion Mañana: ${dia.colacionManana.nombre}</h3>
                    <p>${dia.colacionManana.descripcionNutricional()}</p>
                    
                    <h3>Almuerzo: ${dia.almuerzo.nombre}</h3>
                    <p>${dia.almuerzo.descripcionNutricional()}</p>
                    
                    <h3>Once: ${dia.once.nombre}</h3>
                    <p>${dia.once.descripcionNutricional()}</p>
                    
                    <h3>Cena: ${dia.cena.nombre}</h3>
                    <p>${dia.cena.descripcionNutricional()}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error al insertar los divs:", error);
        // Puedes mostrar un mensaje al usuario si lo deseas
        const contenedor = document.getElementById("contenedor");
        contenedor.innerHTML = '<p>Ocurrió un error al cargar los datos. Por favor, inténtalo de nuevo más tarde.</p>';
    }
}

//Calculos dieteticos y validaciones:

//Formula Harris Benedict

function harrisBenedict(peso, altura, edad, sexo, actividadFisica){
    //la formula recibira como parametros la altura, peso, edad y el sexo del individuo.
    //Sexo: 1 = hombre ; 2 = mujer 
    //peso en kgs
    //altura en cms
    //edad en años
    let tmb = 0; //tasa metabolica basal inicializada en 0
    if (sexo === 1){
        tmb = 66 + (13.7 * peso) + (5 * altura) - (6.8 * edad); //Formula en sexo masculino
    }
    else if (sexo === 2){
        tmb = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * edad);//Formula en sexo femenino
    }

    let resultado = Math.round(tmb * 0.8 * actividadFisica); //Se resta un 20% de la tasa metabolica basal y se multiplica por la act. fisica
    console.log(resultado)
    
    if (isNaN(resultado)){
        return 'Resultado no es un Número, favor revise si los argumentos son válidos';
    } else return resultado;
      //revisar condiciones si este resultado es NaN.
    
}

function actividadFisica(param){
    let nivelActividad = param.toUpperCase();
    let actividad = ['SEDENTARIO', 'POCO ACTIVO', 'MODERADO', 'ACTIVO', 'MUY ACTIVO'];
    let factor = [1.2, 1.375, 1.55, 1.725, 1.9];

    if (actividad.includes(nivelActividad)){
        for (i = 0; i < actividad.length ; i++){
            if (actividad[i] === nivelActividad){
                return factor[i];
            }
        }
    } else {return 'Favor introduzca un valor válido'}
    
}


function sexo(sexo){
    //Funcion para transformar el valor recibido por el front a un numero (1 o 2):
    let sexoMayus = sexo.toUpperCase(); //transforma en mayuscula el valor recibido por parametro
    let masculino = ['HOMBRE', 'MASCULINO']; //opciones validas para el sexo masculino
    let femenino = ['MUJER', 'FEMENINO']; //opciones validas para el genero femenino
    let genero = 0; //inicializamos variable que sera retornada en caso positivo
    if (masculino.includes(sexoMayus)){
        genero = 1;
    } 
    else if (femenino.includes(sexoMayus)){
        genero = 2;
    }
    else {return 'Genero inválido'};

    return genero;
}


function edad(edad){
    //revisamos que la edad este en el rango de adultez:
    if ((edad >= 18) && (edad < 60)){
        return edad;
    }
    else {return 'Valor inválido; no corresponde a la edad adulta'}
}


function altura(altura){
    //revisamos que el paciente tenga anotados sus datos de altura en centimetros:
    if ((altura > 121) && (altura < 275)){
        return altura;
    } else return 'Por favor, escriba la altura en centimetros.';
}

function peso(peso){ //Se revisa que el paciente tenga el peso dentro del rango a trabajar.
    if ((peso >= 20) && (peso < 200)){
        return peso;
    } else return 'Por favor indique su peso correctamente (en Kilogramos).'
}

function imc(peso, altura){ //Clasifica el IMC del individuo segun la formula.
    
    let resultado = '';
    let talla = altura/100;
    let indMasaCorp = peso/(talla*talla);

    if (indMasaCorp >= 50){
        resultado = 'Obesidad IV';
    }
    else if (indMasaCorp >= 40){
        resultado = 'Obesidad III';
    }
    else if (indMasaCorp >= 35){
        resultado = 'Obesidad II';
    }
    else if (indMasaCorp >= 30){
        resultado = 'Obesidad I';
    }
    else if (indMasaCorp >= 25){
        resultado = 'Sobrepeso';
    }
    else if (indMasaCorp >= 18.5){
        resultado = 'Normal';
    } else {
        resultado = 'Bajo Peso'
    }

    return resultado;

}

function requerimiento(funcion){ //Esta funcion recibe de parametro el resultado de la funcion Harris-Benedict 
// y almacena los requerimientos de energia, proteina, carbohidratos y lipidos en una lista.
    
    let listaRequerimientos = [];
    let calorias = funcion;
    let proteinas =(funcion*0.4)/4;
    let carbos = (funcion*0.3)/4;
    let lipidos = (funcion*0.3)/9;

    listaRequerimientos.push(calorias, Math.round(proteinas), Math.round(carbos), Math.round(lipidos));
    
    return listaRequerimientos;
}
