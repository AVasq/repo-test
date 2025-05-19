//Declaración de las clases a utilizar

class Alimento{
    
    //Constructor
    constructor(id, horario, plato, tipo, nombre, calorias, proteinas, carbohidratos, lipidos, precio, gramaje, categoria, acompanamiento, descripcion){
        this._id = id;
        this._horario = horario;
        this._plato = plato;
        this._tipo = tipo;
        this._nombre = nombre;
        this._calorias = calorias;
        this._proteinas = proteinas;
        this._carbohidratos = carbohidratos;
        this._lipidos = lipidos;
        this._precio = precio;
        this._gramaje = gramaje;
        this._categoria = categoria;
        this._acompanamiento = acompanamiento;
        this._descripcion = descripcion;
    }

    //Getters
    get id(){return this._id;}
    get horario(){return this._horario;}
    get plato(){return this._plato;}
    get tipo(){return this._tipo;}
    get nombre(){return this._nombre;}
    get calorias(){return this._calorias;}
    get proteinas(){return this._proteinas;}
    get carbohidratos(){return this._carbohidratos;}
    get lipidos(){return this._lipidos;}
    get precio(){return this._precio;}
    get gramaje(){return this._gramaje;}
    get categoria(){return this._categoria;}
    get acompanamiento(){return this._acompanamiento;}
    get descripcion(){return this._descripcion;}

    //Setters
    set id(id){this._id = id;}
    set horario(horario){this._horario = horario;}
    set tipo(tipo){this._tipo = tipo;}
    set nombre(nombre){this._nombre = nombre;}
    set calorias(calorias){this._calorias = calorias;}
    set proteinas(proteinas){this._proteinas = proteinas;}
    set carbohidratos(carbohidratos){this._carbohidratos = carbohidratos;}
    set lipidos(lipidos){this._lipidos = lipidos;}
    set precio(precio){this._precio = precio;}
    set gramaje(gramaje){this._gramaje = gramaje;}
    set descripcion(descripcion){this._descripcion = descripcion;}

    //Métodos de clase
    descripcionNutricional(){
        return `\nCalorías: ${this._calorias}kcal    Proteínas: ${this._proteinas}g    Carbohidratos: ${this._carbohidratos}g    Lípidos: ${this._lipidos}g\n`;
    }

    multiplicarFactor(factor){
        this._calorias = Math.round(this._calorias*factor);
        this._proteinas = Math.round(this._proteinas*factor);
        this._carbohidratos = Math.round(this._carbohidratos*factor);
        this._lipidos = Math.round(this._lipidos*factor);
        this._precio = Math.round(this._precio*factor);
        this._gramaje = Math.round(this._gramaje*factor);
    }
    
}



class Dia {
  caloriasTotales     = 0;
  proteinasTotales    = 0;
  carbohidratosTotales= 0;
  lipidosTotales      = 0;
  precioTotal = 0;
  
  constructor(
    desayunoFondo, desayunoAcom, desayunoBebes,
    colacionMananaFondo, colacionMananaAcom, colacionMananaFruta, colacionMananaBebes,
    entrada, almuerzoFondo, almuerzoAcom, postre, almuerzoBebes,
    colacionTarde, onceFondo, onceAcom, cenaFondo, cenaAcom,
    paciente
  ) {
    // desayuno
    this._desayunoFondo       = desayunoFondo;
    this._desayunoAcom        = desayunoAcom;
    this._desayunoBebes       = desayunoBebes;
    // colación mañana
    this._colacionMananaFondo = colacionMananaFondo;
    this._colacionMananaAcom  = colacionMananaAcom;
    this._colacionMananaFruta = colacionMananaFruta;
    this._colacionMananaBebes = colacionMananaBebes;
    // almuerzo
    this._entrada             = entrada;
    this._almuerzoFondo       = almuerzoFondo;
    this._almuerzoAcom        = almuerzoAcom || null;  
    this._postre             = postre;
    this._almuerzoBebes      = almuerzoBebes;
    // resto del día
    this._colacionTarde      = colacionTarde;
    this._onceFondo          = onceFondo;
    this._onceAcom           = onceAcom;
    this._cenaFondo          = cenaFondo;
    this._cenaAcom           = cenaAcom;
    this._paciente           = paciente;

    // totales
    this.sumarNutrientes();
  }

  // Getters
  get desayunoFondo() { return this._desayunoFondo; }
  get desayunoAcom() { return this._desayunoAcom }
  get desayunoBebes() { return this._desayunoBebes; }
  get colacionMananaFondo() { return this._colacionMananaFondo; }
  get colacionMananaAcom() { return this._colacionMananaAcom; }
  get colacionMananaBebes() { return this._colacionMananaBebes; }
  get entrada() { return this._entrada; }
  get almuerzoFondo() { return this._almuerzoFondo; }
  get almuerzoAcom() { return this._almuerzoAcom; }
  get postre() { return this._postre; }
  get almuerzoBebes() { return this._almuerzoBebes; }
  get colacionTarde() { return this._colacionTarde; }
  get onceFondo() { return this._onceFondo; }
  get onceAcom() { return this._onceAcom; }
  get cenaFondo() { return this._cenaFondo; }
  get cenaAcom() { return this._cenaAcom; }
  get paciente() { return this._paciente; }
  // Setters
  set desayunoFondo(desayunoFondo) { this._desayunoFondo = desayunoFondo; }
  set desayunoAcom(desayunoAcom) { this._desayunoAcom = desayunoAcom; }
  set desayunoBebes(desayunoBebes) { this._desayunoBebes = desayunoBebes; }
  set colacionMananaFondo(colacionMananaFondo) { this._colacionMananaFondo = colacionMananaFondo; }
  set colacionMananaAcom(colacionMananaAcom) { this._colacionMananaAcom = colacionMananaAcom; }
  set colacionMananaBebes(colacionMananaBebes) { this._colacionMananaBebes = colacionMananaBebes; }
  set entrada(entrada) { this._entrada = entrada; }
  set almuerzoFondo(almuerzoFondo) { this._almuerzoFondo = almuerzoFondo; }
  set almuerzoAcom(almuerzoAcom) { this._almuerzoAcom = almuerzoAcom; }
  set postre(postre) { this._postre = postre; }
  set almuerzoBebes(almuerzoBebes) { this._almuerzoBebes = almuerzoBebes; }
  set colacionTarde(colacionTarde) { this._colacionTarde = colacionTarde; }
  set onceFondo(onceFondo) { this._onceFondo = onceFondo; }
  set onceAcom(onceAcom) { this._onceAcom = onceAcom; }
  set cenaFondo(cenaFondo) { this._cenaFondo = cenaFondo; }
  set cenaAcom(cenaAcom) { this._cenaAcom = cenaAcom; }
  set paciente(paciente) { this._paciente = paciente; }
  // Método para sumar todos los nutrientes
  sumarNutrientes() {
    // 1) Reiniciar los totales
    this.caloriasTotales     = 0;
    this.proteinasTotales    = 0;
    this.carbohidratosTotales= 0;
    this.lipidosTotales      = 0;

    // 2) Luego sumar cada plato si existe
    const platos = [
      this._desayunoFondo,   this._desayunoAcom,    this._desayunoBebes,
      this._colacionMananaFondo, this._colacionMananaAcom,
      this._colacionMananaFruta, this._colacionMananaBebes,
      this._entrada, this._almuerzoFondo, this._almuerzoAcom,
      this._postre, this._almuerzoBebes,
      this._colacionTarde,
      this._onceFondo, this._onceAcom,
      this._cenaFondo, this._cenaAcom
    ];

    for (const plato of platos) {
      if (!plato) continue;
      this.caloriasTotales     += plato.calorias;
      this.proteinasTotales    += plato.proteinas;
      this.carbohidratosTotales+= plato.carbohidratos;
      this.lipidosTotales      += plato.lipidos;
    }
  }

    adecuacionCalorias(){
        let adecuacionCalorias = ((this.caloriasTotales/this.paciente.calorias))*100;
        let adeCalo = Math.round(adecuacionCalorias);
        return adeCalo;
    }
    adecuacionProteinas(){
        let adecuacionProteinas = ((this.proteinasTotales/this.paciente.proteinas))*100;
        let adeProt = Math.round(adecuacionProteinas);
        return adeProt;
    }
    adecuacionCarbohidratos(){
        let adecuacionCarbohidratos = ((this.carbohidratosTotales/this.paciente.carbohidratos))*100;
        let adeCarbo = Math.round(adecuacionCarbohidratos);
        return adeCarbo;
    }
    adecuacionLipidos(){
        let adecuacionLipidos = ((this.lipidosTotales/this.paciente.lipidos))*100;
        let adeLip = Math.round(adecuacionLipidos);
        return adeLip;
    }
    
    //Verificar si se ha cumplido la adecuación nutricional:
    cumplimientoAdecuacion(){
        let adecuaProte = this.adecuacionProteinas();
        let adecuaCarbos = this.adecuacionCarbohidratos();
        let adecuaLip = this.adecuacionLipidos();

        if ((adecuaProte >= 90 && adecuaProte <= 110) && 
            (adecuaCarbos >= 90 && adecuaCarbos <= 110) && 
            (adecuaLip >= 90 && adecuaLip <= 110)){
            return true;
        } else {
            return false;
        }
    }

    factorAdecuacion(requerim, aporte){
        let factor = requerim/aporte;
        return factor;
    }

    
  }



  Dia.prototype.ajustarNutrientes = function() {
    // Helper para obtener todos los Alimentos del día
    const alimentos = () => [
      this._desayunoFondo, this._desayunoAcom, this._desayunoBebes,
      this._colacionMananaFondo, this._colacionMananaAcom,
      this._colacionMananaFruta, this._colacionMananaBebes,
      this._entrada, this._almuerzoFondo, this._almuerzoAcom,
      this._postre, this._almuerzoBebes,
      this._colacionTarde, this._onceFondo, this._onceAcom,
      this._cenaFondo, this._cenaAcom
    ].filter(a => a);
  
    // Vuelve a sumar totales internos
    this.sumarNutrientes();
  
    // Lectura inicial de adecuaciones
    let ade = {
      p: this.adecuacionProteinas(),
      c: this.adecuacionCarbohidratos(),
      l: this.adecuacionLipidos()
    };
  
    // Mapea clave a propiedad del paciente y al getter correspondiente
    const req = {
      p: this.paciente.proteinas,
      c: this.paciente.carbohidratos,
      l: this.paciente.lipidos
    };
    const tot = () => ({
      p: this.proteinasTotales,
      c: this.carbohidratosTotales,
      l: this.lipidosTotales
    });
    const getAde = {
      p: () => this.adecuacionProteinas(),
      c: () => this.adecuacionCarbohidratos(),
      l: () => this.adecuacionLipidos()
    };
  
    // 1) Parejas de macros
    const parejas = [['c','l'], ['p','c'], ['p','l']];
    parejas.forEach(([m1, m2]) => {
      if ((ade[m1] < 90 || ade[m1] > 110) && (ade[m2] < 90 || ade[m2] > 110)) {
        const calcFactor = m => {
          if (ade[m] < 90) return (0.9 * req[m]) / (tot()[m] || 1);
          if (ade[m] > 110) return (1.1 * req[m]) / (tot()[m] || 1);
          return 1;
        };
        const f1 = calcFactor(m1), f2 = calcFactor(m2);
        const factor = Math.abs(1 - f1) > Math.abs(1 - f2) ? f1 : f2;
        alimentos()
          .filter(a => 
            a.categoria.includes(m1 === 'p' ? 'Proteinas' : m1 === 'c' ? 'Carbohidratos' : 'Lipidos') &&
            a.categoria.includes(m2 === 'p' ? 'Proteinas' : m2 === 'c' ? 'Carbohidratos' : 'Lipidos')
          )
          .forEach(a => a.multiplicarFactor(factor));
  
        this.sumarNutrientes();
        ade[m1] = getAde[m1]();
        ade[m2] = getAde[m2]();
      }
    });
  
    // 2) Ajustes individuales
    ['p','c','l'].forEach(m => {
      if (ade[m] < 90 || ade[m] > 110) {
        const target = ade[m] < 90 ? 0.9 * req[m] : 1.1 * req[m];
        const factor = target / (tot()[m] || 1);
        const claveCat = m === 'p' ? 'Proteinas' : m === 'c' ? 'Carbohidratos' : 'Lipidos';
        alimentos()
          .filter(a => a.categoria.includes(claveCat))
          .forEach(a => a.multiplicarFactor(factor));
  
        this.sumarNutrientes();
        ade[m] = getAde[m]();
      }
    });
  
    return this.cumplimientoAdecuacion();
  };


Dia.prototype.maxPor = function(campo) {
  const alimentos = [
    this._desayunoFondo,   this._desayunoAcom,    this._desayunoBebes,
    this._colacionMananaFondo, this._colacionMananaAcom,
    this._colacionMananaFruta, this._colacionMananaBebes,
    this._entrada,         this._almuerzoFondo,   this._almuerzoAcom,
    this._postre,          this._almuerzoBebes,
    this._colacionTarde,
    this._onceFondo,       this._onceAcom,
    this._cenaFondo,       this._cenaAcom
  ].filter(a => a != null);  

  return alimentos.reduce((max, a) =>
    (a[campo] > (max?.[campo] ?? -Infinity) ? a : max),
    alimentos[0]
  );
};


Dia.prototype.replaceAlimento = function(horario, nuevoAlimento) {
  const campos = [
    '_desayunoFondo', '_desayunoAcom', '_desayunoBebes',
    '_colacionMananaFondo', '_colacionMananaAcom', '_colacionMananaFruta', '_colacionMananaBebes',
    '_entrada',
    '_almuerzoFondo', '_almuerzoAcom', '_postre', '_almuerzoBebes',
    '_colacionTarde',
    '_onceFondo', '_onceAcom',
    '_cenaFondo', '_cenaAcom'
  ];

  for (const campo of campos) {
    const actual = this[campo];
    if (actual && actual.horario === horario) {
      this[campo] = nuevoAlimento;
      return true; 
    }
  }
  console.warn(`No encontré slot para horario "${horario}"`);
  return false;
};
  
  Dia.prototype.recalcularTotales = function() {
    this.sumarCalorias();
    this.sumarProteinas();
    this.sumarCarbohidratos();
    this.sumarLipidos();
    this.sumarPrecio();
  };



class Paciente{

    constructor(id, nutri_id, nombre, apellido, rut, peso, altura, sexo, 
      edad, actFisica, pliegueTricipital, pliegueSubEscapular, pliegueSupraIliaco, 
      pliegueBicipital, circunferenciaBraquial, circunferenciaCintura, necesidad){
        this._id = id;
        this._nutri_id = nutri_id;
        this._nombre = nombre;
        this._apellido = apellido;
        this._rut = rut;
        this._peso = peso;
        this._altura = altura;
        this._sexo = sexo;
        this._edad = edad;
        this._actividadFisica = actFisica;
        this._pliegueTricipital = pliegueTricipital;
        this._pliegueSubEscapular = pliegueSubEscapular;
        this._pliegueSupraIliaco = pliegueSupraIliaco;
        this._pliegueBicipital = pliegueBicipital;
        this._circunferenciaBraquial = circunferenciaBraquial;
        this._circunferenciaCintura = circunferenciaCintura;
        this._necesidad = necesidad;
        this._calorias = this.harrisBenedict();
        this._protes = this.proteinas();
        this._carbos = this.carbohidratos();
        this._lipis = this.lipidos();
    }
    
    get nutri_id(){return this._nutri_id;}
    get nombre(){return this._nombre;}
    get apellido(){return this._apellido;}
    get rut(){return this._rut;}
    get peso(){return this._peso;}
    get altura(){return this._altura;}
    get edad(){return this._edad;}
    get sexo(){return this._sexo;}
    get actividadFisica(){return this._actividadFisica;}
    get pliegueTricipital(){return this._pliegueTricipital;}
    get pliegueSubEscapular(){return this._pliegueSubEscapular;}
    get pliegueSupraIliaco(){return this._pliegueSupraIliaco;}
    get pliegueBicipital(){return this._pliegueBicipital;}
    get circunferenciaBraquial(){return this._circunferenciaBraquial;}
    get circunferenciaCintura(){return this._circunferenciaCintura;}
    get necesidad(){return this._necesidad;}
    get calorias(){return this._calorias;}
    get protes(){return this._protes;}
    get carbos(){return this._carbos;}
    get lipis(){return this._lipis;}

    set nutri_id(nutri_id){this._nutri_id = nutri_id;}
    set nombre(nombre){this._nombre = nombre;}



    set peso(peso){this._peso = peso;}
    set altura(altura){this._altura = altura;}
    set edad(edad){this._edad = edad;}
    set genero(genero){this._genero = genero;}
    set actividadFisica(actividadFisica){this._actividadFisica = actividadFisica;}

    imc(){
      let peso = this._peso;
      let talla = (this._altura/100);
      let indiceMasaCorporal = peso / (talla * talla);
      return indiceMasaCorporal;
    }

    clasificacionImc(){
      const valorIMC = this.imc();
      if (valorIMC < 18.5){
        return "Desnutrición / Bajo Peso";
      }
      if ((valorIMC >= 18.5) && (valorIMC <= 24.9)){
        return "Peso Normal";
      }
      if ((valorIMC >= 25) && (valorIMC <= 29.9)){
        return "Sobrepeso";
      }
      if ((valorIMC >= 30) && (valorIMC <= 34.99)){
        return "Obesidad Grado I";
      }
      if ((valorIMC >= 35) && (valorIMC <= 39.99)){
        return "Obesidad Grado II";
      }
      if (valorIMC >= 40){
        return "Obesidad Grado III (Mórbida)";
      }
    }

    clasificacionPCT(){
      const pct = this._pliegueTricipital;
      if (this._sexo === 1){
        if ((this._edad >= 18) && (this._edad <=24)){
          if (pct < 4){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 4) && (pct <= 6)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 6) && (pct <= 16.8)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 16.8) && (pct <= 26)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 26){
            return "Exceso de Masa Grasa";
          }
        }
        if ((this._edad >= 25) && (this._edad <=34)){
          if (pct < 4.5){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 4.5) && (pct <= 6)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 6) && (pct <= 17.3)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 17.3) && (pct <= 26.7)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 26.7){
            return "Exceso de Masa Grasa";
          }
        }
        if ((this._edad >= 35) && (this._edad <=44)){
          if (pct < 5){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 5) && (pct <= 7)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 7) && (pct <= 17.3)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 17.3) && (pct <= 23.6)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 23.6){
            return "Exceso de Masa Grasa";
          }
        }
        if ((this._edad >= 45) && (this._edad <=54)){
          if (pct < 5){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 5) && (pct <= 7)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 7) && (pct <= 18.1)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 18.1) && (pct <= 24.5)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 24.5){
            return "Exceso de Masa Grasa";
          }
        }
        if ((this._edad >= 55) && (this._edad <=64)){
          if (pct < 5){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 5) && (pct <= 6.5)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 6.5) && (pct <= 18.6)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 18.6) && (pct <= 24.7)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 24.7){
            return "Exceso de Masa Grasa";
          }
        }
        if (this._edad >= 65){
          if (pct < 4.5){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 4.5) && (pct <= 6.5)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 6.5) && (pct <= 18.8)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 18.8) && (pct <= 24.7)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 24.7){
            return "Exceso de Masa Grasa";
          }
        }
      }
      if (this._sexo === 2){
        if ((this._edad >= 18) && (this._edad <=24)){
          if (pct < 9.4){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 9.4) && (pct <= 12)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 12) && (pct <= 27)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 27) && (pct <= 34)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 34){
            return "Exceso de Masa Grasa";
          }
        }
        if ((this._edad >= 25) && (this._edad <=34)){
          if (pct < 10.5){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 10.5) && (pct <= 13.5)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 13.5) && (pct <= 27.2)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 27.2) && (pct <= 34.3)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 34.3){
            return "Exceso de Masa Grasa";
          }
        }
        if ((this._edad >= 35) && (this._edad <=44)){
          if (pct < 12){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 12) && (pct <= 16)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 16) && (pct <= 29.9)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 29.9) && (pct <= 36.6)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 36.6){
            return "Exceso de Masa Grasa";
          }
        }
        if ((this._edad >= 45) && (this._edad <=54)){
          if (pct < 13){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 13) && (pct <= 17)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 17) && (pct <= 32.6)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 32.6) && (pct <= 37.8)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 37.8){
            return "Exceso de Masa Grasa";
          }
        }
        if ((this._edad >= 55) && (this._edad <=64)){
          if (pct < 11){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 11) && (pct <= 16)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 16) && (pct <= 34.2)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 34.2) && (pct <= 39.4)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 39.4){
            return "Exceso de Masa Grasa";
          }
        }
        if (this._edad >= 65){
          if (pct < 11.5){
            return "Masa Grasa Disminuida";
          }
          if ((pct >= 11.5) && (pct <= 16)){
            return "Masa Grasa en Riesgo de déficit nutricional / Bajo la media";
          }
          if ((pct > 16) && (pct <= 34.2)){
            return "Masa Grasa Normal / Promedio";
          }
          if ((pct > 34.2) && (pct <= 39.1)){
            return "Masa Grasa Aumentada";
          }
          if (pct > 39.1){
            return "Exceso de Masa Grasa";
          }
        }
      }
    }
    
    //Calculo de la circunferencia muscular del brazo
    cmb(){
      const cb = this._circunferenciaBraquial;
      const pct = this._pliegueTricipital;
      const cMB = (cb*10)-(3.14*pct);
      return (cMB/10);
    }
    
    //Calculo del área muscular del brazo corregido
    amb(){
      const cmb = this.cmb(); //Revisar la sintaxis
      let aMBc = ((cmb*cmb)/(4*3.14));
      if (this._sexo == 1){
        aMBc -= 10;
      }
      if (this._sexo == 2){
        aMBc -= 6.5;
      }
      return aMBc;
    }
    
    //Clasificación según percentil/sexo
    clasificacionAMB(){
      const edad = this._edad;
      const amb = this.amb();
      if (this._sexo == 1){
        if ((edad >= 18) && (edad < 19)){
          if (amb < 42){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 42) && (amb <= 47.5)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 47.5) && (amb <= 72.2)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 72.2) && (amb <= 81.5)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 81.5){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 19) && (edad < 20)){
          if (amb < 42.6){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 42.6) && (amb <= 48.2)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 48.2) && (amb <= 73.1)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 73.1) && (amb <= 82.5)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 82.5){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 20) && (edad < 30)){
          if (amb < 45.2){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 45.2) && (amb <= 51.4)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 51.4) && (amb <= 79.1)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 79.1) && (amb <= 89.6)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 89.6){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 30) && (edad < 40)){
          if (amb < 48.7){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 48.7) && (amb <= 55.2)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 55.2) && (amb <= 84)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 84) && (amb <= 95)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 95){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 40) && (edad < 50)){
          if (amb < 49.8){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 49.8) && (amb <= 56.2)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 56.2) && (amb <= 84.8)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 84.8) && (amb <= 95.6)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 95.6){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 50) && (edad < 60)){
          if (amb < 49.7){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 49.7) && (amb <= 55.8)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 55.8) && (amb <= 82.3)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 82.3) && (amb <= 92.1)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 92.1){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 60) && (edad < 70)){
          if (amb < 46.8){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 46.8) && (amb <= 52.7)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 52.7) && (amb <= 78.6)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 78.6) && (amb <= 88.3)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 88.3){
            return "Buena Nutrición Muscular"
          }
        }
      }
      if (this._sexo == 2){
        //Continuar en paginas 88 y 102 de pdf
        if ((edad >= 18) && (edad < 19)){
          if (amb < 24.9){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 24.9) && (amb <= 28.6)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 28.6) && (amb <= 46)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 46) && (amb <= 52.9)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 52.9){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 19) && (edad < 20)){
          if (amb < 25.3){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 25.3) && (amb <= 29.1)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 29.1) && (amb <= 46.7)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 46.7) && (amb <= 53.6)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 53.6){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 20) && (edad < 30)){
          if (amb < 26.4){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 26.4) && (amb <= 30.3)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 30.3) && (amb <= 48.6)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 48.6) && (amb <= 55.7)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 55.7){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 30) && (edad < 40)){
          if (amb < 27.4){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 27.4) && (amb <= 31.9)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 31.9) && (amb <= 53.4)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 53.4) && (amb <= 62)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 62){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 40) && (edad < 50)){
          if (amb < 29){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 29) && (amb <= 33.9)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 33.9) && (amb <= 57.2)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 57.2) && (amb <= 66.7)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 66.7){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 50) && (edad < 60)){
          if (amb < 28.8){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 28.8) && (amb <= 33.7)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 33.7) && (amb <= 57.4)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 57.4) && (amb <= 67.1)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 67.1){
            return "Buena Nutrición Muscular"
          }
        }
        if ((edad >= 60) && (edad < 70)){
          if (amb < 28.1){
            return "Masa Muscular Disminuída";
          }
          if ((amb >= 28.1) && (amb <= 32.9)){
            return "Masa Muscular en Riesgo de déficit / Bajo la Media"
          }
          if ((amb > 32.9) && (amb <= 56.2)){
            return "Masa Muscular Normal / Media"
          }
          if ((amb > 56.2) && (amb <= 65.7)){
            return "Masa Muscular Aumentada / Sobre la Media"
          }
          if (amb > 65.7){
            return "Buena Nutrición Muscular"
          }
        }
      }

    }

    clasificacionCC(){
      const cc = this._circunferenciaCintura;
      let clasificacion = "No presenta riesgo metabólico según Circunferencia de Cintura";
      if (this._sexo == 1){
        if (cc >= 90){
          clasificacion = "Obesidad Abdominal según Circunferencia de Cintura"
        }
        if (cc >= 102){
          clasificacion += " y Riesgo MUY Aumentado de enfermedades cardiovasculares"
        }
        else if (cc >= 94){
          clasificacion += " y Riesgo Aumentado de enfermedades cardiovasculares"
        }
      }
      if (this._sexo == 2){
        if (cc >= 80){
          clasificacion = "Obesidad Abdominal según Circunferencia de Cintura, y riesgo aumentado de enfermedades cardiovasculares"
        }
        if (cc >= 88){
          clasificacion = "Obesidad Abdominal según Circunferencia de Cintura, y Riesgo MUY Aumentado de enfermedades cardiovasculares"
        }
      }
      
      return clasificacion;
    }

    densidadCorporal(){
      let densidad;
      const sumatoriaPliegues = this._pliegueTricipital + this._pliegueSubEscapular + this._pliegueSupraIliaco + this._pliegueBicipital;
      if (this._sexo == 1){
        if ((this._edad >= 18) && (this._edad <= 19)){
          densidad = 1.1620 - 0.0630 * (Math.log(sumatoriaPliegues));
        }
        if ((this._edad >= 20) && (this._edad <= 29)){
          densidad = 1.1631 - 0.0632 * (Math.log(sumatoriaPliegues));
        }
        if ((this._edad >= 30) && (this._edad <= 39)){
          densidad = 1.1422 - 0.0544 * (Math.log(sumatoriaPliegues));
        }
        if ((this._edad >= 40) && (this._edad <= 49)){
          densidad = 1.1620 - 0.0700 * (Math.log(sumatoriaPliegues));
        }
        if (this._edad >= 50){
          densidad = 1.1715 - 0.0779 * (Math.log(sumatoriaPliegues));
        }
      }
      if (this._sexo == 2){
        if ((this._edad >= 18) && (this._edad <= 19)){
          densidad = 1.1549 - 0.0678 * (Math.log(sumatoriaPliegues));
        }
        if ((this._edad >= 20) && (this._edad <= 29)){
          densidad = 1.1599 - 0.0717 * (Math.log(sumatoriaPliegues));
        }
        if ((this._edad >= 30) && (this._edad <= 39)){
          densidad = 1.1423 - 0.0632 * (Math.log(sumatoriaPliegues));
        }
        if ((this._edad >= 40) && (this._edad <= 49)){
          densidad = 1.1333 - 0.0612 * (Math.log(sumatoriaPliegues));
        }
        if (this._edad >= 50){
          densidad = 1.1339 - 0.0645 * (Math.log(sumatoriaPliegues));
        }
      }
      return densidad;
    }

    porcentajeGrasaCorporal(){
      const densidad = this.densidadCorporal();
      let pgc =  ((4.57 / densidad) - 4.142) * 100;
      return pgc;
    }

    clasificacionGC(){
      const grasaCorporal = this.porcentajeGrasaCorporal();
      if (this._sexo == 1){
        if (grasaCorporal <= 5){
          return "Riesgo de Enfermedades asociadas a la Desnutrición"
        }
        else if ((grasaCorporal >= 6) && (grasaCorporal <= 14)){
          return "% Grasa Corporal Bajo el promedio"
        }
        else if (grasaCorporal == 15){
          return "% Grasa Corporal Promedio"
        }
        else if ((grasaCorporal >= 16) && (grasaCorporal <= 24)){
          return "% Grasa Corporal Por Sobre el promedio"
        }
        else if (grasaCorporal >= 25){
          return "Riesgo de Enfermedades asociadas a la Obesidad"
        }
      }
      if (this._sexo == 2){
        if (grasaCorporal <= 8){
          return "Riesgo de Enfermedades asociadas a la Desnutrición"
        }
        else if ((grasaCorporal >= 9) && (grasaCorporal <= 22)){
          return "% Grasa Corporal Bajo el promedio"
        }
        else if (grasaCorporal == 23){
          return "% Grasa Corporal Promedio"
        }
        else if ((grasaCorporal >= 24) && (grasaCorporal <= 31)){
          return "% Grasa Corporal Por Sobre el promedio"
        }
        else if (grasaCorporal >= 32){
          return "Riesgo de Enfermedades asociadas a la Obesidad"
        }
      }
    }

    harrisBenedict(){
      const peso = this._peso;
      const altura = this._altura;
      const edad = this._edad;
      const sexo = this._sexo;
      const actividadFisica = this._actividadFisica;
      const necesidad = this._necesidad;
      
      let tmb = 0; //tasa metabolica basal inicializada en 0
        if (sexo === 1){
            tmb = 66 + (13.7 * peso) + (5 * altura) - (6.8 * edad); //Formula en sexo masculino
        }
        else if (sexo === 2){
            tmb = 655 + (9.6 * peso) + (1.8 * altura) - (4.7 * edad);//Formula en sexo femenino
        }
      
      let resultado; 
      
      if (necesidad == 1){
        resultado =  Math.round(tmb * 0.8 * actividadFisica); //Se resta un 20% de la tmb
      }
      else if (necesidad == 2){
        resultado = Math.round(tmb * 1 * actividadFisica); //Se mantiene
      }
      else if (necesidad == 3){
        resultado = Math.round(tmb * 1.2 * actividadFisica);
      }
      
      return resultado;
        
    }

    proteinas(){ //Dejarlas con 1 o 2 decimales
      const calorias = this.harrisBenedict();
      let proteinas = (calorias * 0.4) / 4;
      return proteinas;
    }

    carbohidratos(){ //Dejarlas con 1 o 2 decimales
      const calorias = this.harrisBenedict();
      let carbos = (calorias * 0.3) / 4;
      return carbos;
    }

    lipidos(){ //Dejarlas con 1 o 2 decimales
      const calorias = this.harrisBenedict();
      let lipidos = (calorias * 0.3) / 9;
      return lipidos;
    }

    calcularMacronutrientes(){
      this._calorias = this.harrisBenedict();
      this._proteinas = this.proteinas();
      this._carbohidratos = this.carbohidratos();
      this._lipidos = this.lipidos();
    }

}

class Usuario{
    constructor(id, rut, nombre, apellido, correo, contrasena, rolId) {
        this._id = id;
        this._rut = rut;
        this._nombre = nombre;
        this._apellido = apellido;
        this._correo = correo;
        this._contrasena = contrasena;
        this._rolId = rolId;
    }
    
    get id(){return this._id};
    get rut(){return this._rut};
    get nombre(){return this._nombre};
    get apellido(){return this._apellido};
    get correo(){return this._correo};
    get contrasena(){return this._contrasena};
    get rolId(){return this._rolId};

}

export { Paciente };
export { Usuario };