
async function obtenerAlimentoPorHorarioYPlato(horario, plato) {
    const resp = await fetch(
      `http://localhost:3000/api/alimento?horario=${encodeURIComponent(horario)}&plato=${encodeURIComponent(plato)}`
    );
    if (!resp.ok) throw new Error('No se pudo obtener el alimento');
    return resp.json();
  }
  
  async function obtenerAlimentoPorHorarioYPlatoDiferenteTipo(horario, plato, tipoExcluido) {
    const resp = await fetch(
      `http://localhost:3000/api/alimento?horario=${encodeURIComponent(horario)}&plato=${encodeURIComponent(plato)}&tipoExcluido=${encodeURIComponent(tipoExcluido)}`
    );
    if (!resp.ok) throw new Error('No se pudo obtener el acompañamiento');
    return resp.json();
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
  

function toAlimento(a) {
    return new Alimento(
      a.id, a.horario, a.plato, a.tipo, a.nombre,
      a.calorias, a.proteinas, a.carbohidratos, a.lipidos,
      a.precio, a.gramaje, a.categoria, a.acompanamiento, a.descripcion
    );
  }
  
  async function obtenerAlimentosDesayuno() {
    const resp = await fetch('http://localhost:3000/api/alimento/desayuno');
    if (!resp.ok) throw new Error('Error al obtener desayuno');
    const { fondo, acompanamiento, bebestible } = await resp.json();
    return {
      fondo: toAlimento(fondo),
      acompanamiento: toAlimento(acompanamiento),
      bebestible: toAlimento(bebestible)
    };
  }
  
  async function obtenerAlimentosColacionManana() {
    const resp = await fetch('http://localhost:3000/api/alimento/colacionManana');
    if (!resp.ok) throw new Error('Error al obtener colación mañana');
    const { fondo, acompanamiento, fruta, bebestible } = await resp.json();
    return {
      fondo: toAlimento(fondo),
      acompanamiento: toAlimento(acompanamiento),
      fruta: toAlimento(fruta),
      bebestible: toAlimento(bebestible)
    };
  }

 
function toAlimento(a) {
  return new Alimento(
    a.id, a.horario, a.plato, a.tipo, a.nombre,
    a.calorias, a.proteinas, a.carbohidratos, a.lipidos,
    a.precio, a.gramaje, a.categoria, a.acompanamiento, a.descripcion
  );
}

async function obtenerAlimentosAlmuerzo(tipo) {
  const url = `http://localhost:3000/api/alimento/almuerzo?tipo=${encodeURIComponent(tipo)}`;

  const resp = await fetch(url);
  if (!resp.ok) {
    const mensaje = await resp.text();
    throw new Error(`Error al obtener almuerzo: ${mensaje}`);
  }

  const data = await resp.json();
  console.log('almuerzo recibido del API:', data);
  const entrada       = toAlimento(data.entrada);
  const fondo         = toAlimento(data.fondo);
  const acompanamiento= data.acompanamiento
                         ? toAlimento(data.acompanamiento)
                         : null;
  const postre        = toAlimento(data.postre);
  const bebestible    = toAlimento(data.bebestible);
  return { entrada, fondo, acompanamiento, postre, bebestible };
}


  
  async function obtenerAlimentoColacionTarde() {
    const resp = await fetch('http://localhost:3000/api/alimento/colacionTarde');
    if (!resp.ok) throw new Error('Error al obtener colación tarde');
    const a = await resp.json();
    return toAlimento(a);
  }
  
  async function obtenerAlimentosOnce() {
    const resp = await fetch('http://localhost:3000/api/alimento/once');
    if (!resp.ok) throw new Error('Error al obtener once');
    const { fondo: aF, acompanamiento: aA } = await resp.json();
  
    const fondo = aF ? toAlimento(aF) : null;
    const acompanamiento = (aA ? toAlimento(aA) : fondo);
  
    return { fondo, acompanamiento };
  }
  
  async function obtenerAlimentosCena() {
    const resp = await fetch('http://localhost:3000/api/alimento/cena');
    if (!resp.ok) throw new Error('Error al obtener cena');
    const { fondo, acompanamiento } = await resp.json();
    return {
      fondo: toAlimento(fondo),
      acompanamiento: toAlimento(acompanamiento)
    };
  }

  async function crearDia(tipoAlmuerzo) {
    const { fondo: dF, acompanamiento: dA, bebestible: dB } = await obtenerAlimentosDesayuno();
    const desayuno = [ dF, dA, dB ];
  
    const { fondo: cMF, acompanamiento: cMA, fruta: cFr, bebestible: cMB } =
      await obtenerAlimentosColacionManana();
    const colacionManana = [ cMF, cMA, cFr, cMB ];
  
    const { entrada, fondo, acompanamiento, postre, bebestible } =
      await obtenerAlimentosAlmuerzo(tipoAlmuerzo);
    const almuerzo = [ entrada, fondo, acompanamiento, postre, bebestible ];
  
    const ct = await obtenerAlimentoColacionTarde();
  
    const { fondo: oF, acompanamiento: oA } = await obtenerAlimentosOnce();
    const once = [ oF, oA ];
  
    const { fondo: ceF, acompanamiento: ceA } = await obtenerAlimentosCena();
    const cena = [ ceF, ceA ];
  
    const paciente = JSON.parse(localStorage.getItem('pacienteSeleccionado'));
    return new Dia(
      desayuno[0], desayuno[1], desayuno[2],
      colacionManana[0], colacionManana[1], colacionManana[2], colacionManana[3],
      entrada, fondo, acompanamiento, postre, bebestible,
      ct,
      once[0], once[1],
      cena[0], cena[1],
      paciente
    );
  }

  function mezclarArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  
  function generarMatriz(filas, base) {
    const m = [];
    for (let i = 0; i < filas; i++) {
      m.push(mezclarArray(base));
    }
    return m;
  }


  async function listaMes() {
    const meses = [];
    const tipos = ['Leguminosas','Vacuno','Ave','Pescado','Sopa','Hipercalorico'];
    const matriz = generarMatriz(4, tipos).flat();
  
    let usedFondosSemana = new Set();
  
    for (let i = 0; i < matriz.length; i++) {
      if (i % 7 === 0) {
        usedFondosSemana.clear();
      }
  
      const tipoAlmuerzo = matriz[i];
      let dia, intentos = 0;
  
      do {
        dia = await crearDia(tipoAlmuerzo);
        intentos++;
      } while (usedFondosSemana.has(dia.almuerzoFondo.nombre) && intentos < 50);
  
      usedFondosSemana.add(dia.almuerzoFondo.nombre);
  
      await dia.ajustarNutrientes();
  
      meses.push(dia);
    }
  
    return meses;
  }
  
  

function adecuarNutrientes() {
    let factorProteinas, factorCarbos, factorLipidos;
    if (this.adecuacionProteinas() < 90 || this.adecuacionProteinas() > 110) {
        factorProteinas = this.factorAdecuacion(this.paciente.proteinas, this.proteinasTotales);
    }
    if (this.adecuacionCarbohidratos() < 90 || this.adecuacionCarbohidratos() > 110) {
        factorCarbos = this.factorAdecuacion(this.paciente.carbohidratos, this.carbohidratosTotales);
    }
    if (this.adecuacionLipidos() < 90 || this.adecuacionLipidos() > 110) {
        factorLipidos = this.factorAdecuacion(this.paciente.lipidos, this.lipidosTotales);
    }
    const alimentos = [this.desayuno, this.colacionManana, this.ensalada, this.almuerzo, this.postre, this.colacionTarde, this.once, this.cena];
    for (let alimento of alimentos) {
        if (factorProteinas) {
            if (alimento.proteinas < alimento.carbohidratos && alimento.proteinas < alimento.lipidos) {
                alimento.multiplicarFactor(factorProteinas);
            } else if (alimento.proteinas > alimento.carbohidratos && alimento.proteinas > alimento.lipidos) {
                alimento.multiplicarFactor(1 / factorProteinas);
            }
        }
        if (factorCarbos) {
            if (alimento.carbohidratos < alimento.proteinas && alimento.carbohidratos < alimento.lipidos) {
                alimento.multiplicarFactor(factorCarbos);
            } else if (alimento.carbohidratos > alimento.proteinas && alimento.carbohidratos > alimento.lipidos) {
                alimento.multiplicarFactor(1 / factorCarbos);
            }
        }
        if (factorLipidos) {
            if (alimento.lipidos < alimento.proteinas && alimento.lipidos < alimento.carbohidratos) {
                alimento.multiplicarFactor(factorLipidos);
            } else if (alimento.lipidos > alimento.proteinas && alimento.lipidos > alimento.carbohidratos) {
                alimento.multiplicarFactor(1 / factorLipidos);
            }
        }
    }
}


function renderBloqueComida(titulo, alimentos) {

  const list = alimentos.filter(a => a);
  if (list.length === 0) return '';
  
  let unidad;
  let html = `<section class="horario">
    <h3>${titulo}</h3>
    <div class="detalle-preparaciones">`;
  
    for (const a of list) {
      unidad = a.plato === "Bebestible" ? "ml" : "g";
      html += `
        <div class="item-comida">
          <strong>${a.nombre}</strong>
          <p>${a.descripcionNutricional()}</p>
          <p>Gramos: ${a.gramaje}${unidad} | Precio: $${a.precio}</p>
          ${a.descripcion
            ? `<pre class="preparacion">${formatDescripcion(a.descripcion)}</pre>`
            : ""}
        </div>`;
    }
  
  html += `</div></section>`;
  return html;
}

async function insertarDivs() {
  try {
    const lista = await listaMes();
    const cont = document.getElementById("contenedor");
    cont.innerHTML = "";

    lista.forEach((dia, i) => {
      let html = `<div class="dia"><h2>Día ${i + 1}</h2>`;


      html += renderBloqueComida("Desayuno", [
        dia.desayunoFondo,
        dia.desayunoAcom,
        dia.desayunoBebes
      ]);


      html += renderBloqueComida("Colación mañana", [
        dia.colacionMananaFondo,
        dia.colacionMananaAcom,
        dia.colacionMananaFruta,
        dia.colacionMananaBebes
      ]);


      html += renderBloqueComida("Almuerzo", [
        dia.entrada,
        dia.almuerzoFondo,
        dia.almuerzoAcom,
        dia.postre,
        dia.almuerzoBebes
      ]);

      html += renderBloqueComida("Colación tarde", [
        dia.colacionTarde
      ]);


      html += renderBloqueComida("Once", [
        dia.onceFondo,
        dia.onceAcom
      ]);


      html += renderBloqueComida("Cena", [
        dia.cenaFondo,
        dia.cenaAcom
      ]);


      html += `
        <table class="resumen-dia">
          <tr><th></th><th>Calorías</th><th>Prot.</th><th>Carb.</th><th>Lip.</th></tr>
          <tr>
            <td>Aporte</td>
            <td>${dia.caloriasTotales}</td>
            <td>${dia.proteinasTotales}</td>
            <td>${dia.carbohidratosTotales}</td>
            <td>${dia.lipidosTotales}</td>
          </tr>
          <tr>
            <td>Necesidades</td>
            <td>${dia.paciente.calorias}</td>
            <td>${dia.paciente.proteinas}</td>
            <td>${dia.paciente.carbohidratos}</td>
            <td>${dia.paciente.lipidos}</td>
          </tr>
          <tr>
            <td>Adecuación %</td>
            <td>${dia.adecuacionCalorias()}</td>
            <td>${dia.adecuacionProteinas()}</td>
            <td>${dia.adecuacionCarbohidratos()}</td>
            <td>${dia.adecuacionLipidos()}</td>
          </tr>
        </table>
      `;

      html += `</div>`; 
      cont.innerHTML += html;
    });

    if (lista.length) {
      document.getElementById('btnPDF').style.display = 'inline-block';
    }
  } catch (err) {
    console.error("⚠️ Error en insertarDivs:", err);
    document.getElementById("contenedor").innerHTML =
      '<p>Ocurrió un error al cargar los datos. Por favor, inténtalo de nuevo más tarde.</p>';
  }
}

function formatDescripcion(txt) {
  return txt
    .replace(/^Preparación:\s*/, "Preparación:\n")
    .replace(/INGREDIENTES/, "\nINGREDIENTES")
    .replace(/\*\s*/g, "\n* ")
    .replace(/Preparación [^:]+:/, match => `\n${match}`)
    .replace(/(\d+\.)\s*/g, "\n$1 ");
}



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
    let sexoMayus = sexo.toUpperCase(); 
    let masculino = ['HOMBRE', 'MASCULINO']; 
    let femenino = ['MUJER', 'FEMENINO']; 
    let genero = 0; 
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
    if ((edad >= 18) && (edad < 60)){
        return edad;
    }
    else {return 'Valor inválido; no corresponde a la edad adulta'}
}


function altura(altura){
    if ((altura > 121) && (altura < 275)){
        return altura;
    } else return 'Por favor, escriba la altura en centimetros.';
}

function peso(peso){
    if ((peso >= 20) && (peso < 200)){
        return peso;
    } else return 'Por favor indique su peso correctamente (en Kilogramos).'
}

function interpretarImc(peso, altura){ 
    
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

function requerimiento(funcion){ 
    let listaRequerimientos = [];
    let calorias = funcion;
    let proteinas =(funcion*0.3)/4;
    let carbos = (funcion*0.4)/4;
    let lipidos = (funcion*0.3)/9;

    listaRequerimientos.push(calorias, Math.round(proteinas), Math.round(carbos), Math.round(lipidos));
    
    return listaRequerimientos;
  }

async function balancearDia(dia) {
    const MAX_ITERS = 5;
    for (let iter = 0; iter < MAX_ITERS; iter++) {
      if (dia.cumplimientoAdecuacion()) return true;
      const adeCar = dia.adecuacionCarbohidratos();
      const adeLip = dia.adecuacionLipidos();
  
      let culpable, macro, filtro;
      if (adeCar > 110) {
        culpable = dia.maxPor('carbohidratos');
        macro = 'carbohidratos';
      } else if (adeLip > 110) {
        culpable = dia.maxPor('lipidos');
        macro = 'lipidos';
      } else {
        break;
      }
  
      filtro = macro === 'carbohidratos'
        ? `&alto_proteina=true&max_carbo=${Math.floor(culpable.carbohidratos)}`
        : `&alto_proteina=true&max_lip=${Math.floor(culpable.lipidos)}`;
  
      const sustitutoJSON = await fetch(
        `http://localhost:3000/api/alimento?horario=${culpable.horario}${filtro}`
      ).then(r => {
        if (!r.ok) throw new Error('No hay sustituto disponible');
        return r.json();
      });

      const nuevo = new Alimento(
        sustitutoJSON.id,
        sustitutoJSON.horario,
        sustitutoJSON.tipo,
        sustitutoJSON.nombre,
        sustitutoJSON.calorias,
        sustitutoJSON.proteinas,
        sustitutoJSON.carbohidratos,
        sustitutoJSON.lipidos,
        sustitutoJSON.precio,
        sustitutoJSON.gramaje,
        sustitutoJSON.descripcion
      );
      dia.replaceAlimento(culpable.horario, nuevo);
      dia.recalcularTotales();
    }
    return dia.cumplimientoAdecuacion();
  }

 
  
