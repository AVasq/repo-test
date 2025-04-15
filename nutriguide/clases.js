//Declaración de las clases a utilizar

class Alimento{
    
    //Constructor
    constructor(id, horario, tipo, nombre, calorias, proteinas, carbohidratos, lipidos, precio, gramaje, descripcion){
        this._id = id;
        this._horario = horario;
        this._tipo = tipo;
        this._nombre = nombre;
        this._calorias = calorias;
        this._proteinas = proteinas;
        this._carbohidratos = carbohidratos;
        this._lipidos = lipidos;
        this._precio = precio;
        this._gramaje = gramaje;
        this._descripcion = descripcion;
    }

    //Getters
    get id(){return this._id;}
    get horario(){return this._horario;}
    get tipo(){return this._tipo;}
    get nombre(){return this._nombre;}
    get calorias(){return this._calorias;}
    get proteinas(){return this._proteinas;}
    get carbohidratos(){return this._carbohidratos;}
    get lipidos(){return this._lipidos;}
    get precio(){return this._precio;}
    get gramaje(){return this._gramaje;}
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
        this._calorias *= factor;
        this._proteinas *= factor;
        this._carbohidratos *= factor;
        this._lipidos *= factor;
        this._precio *= factor;
        this._gramaje *= factor;
    }
    
}

/*let alimento1 = new Alimento(1, "Almuerzo", "Vacuno", "Cazuela de Vacuno", 343, 28, 36, 10, 508, 172, "Una rica sopa de carne, papas y verduras")
alimento1.descripcionNutricional();
alimento1.multiplicarFactor(2);
alimento1.descripcionNutricional();*/

class Dia{

    caloriasTotales = 0;
    proteinasTotales = 0;
    carbohidratosTotales = 0;
    lipidosTotales = 0;
    precioTotal = 0;

    //Constructor
    constructor(desayuno, colacionManana, ensalada, almuerzo, postre, colacionTarde, once, cena){
        this._desayuno = desayuno;
        this._colacionManana = colacionManana;
        this._ensalada = ensalada;
        this._almuerzo = almuerzo;
        this._postre = postre;
        this._colacionTarde = colacionTarde;
        this._once = once;
        this._cena = cena;
    }
    
    //Getters
    get desayuno(){return this._desayuno;}
    get colacionManana(){return this._colacionManana;}
    get ensalada(){return this._ensalada;}
    get almuerzo(){return this._almuerzo;}
    get postre(){return this._postre;}
    get colacionTarde(){return this._colacionTarde;}
    get once(){return this._once;}
    get cena(){return this._cena;}
    
    //Setters
    set desayuno(desayuno){this._desayuno = desayuno;}
    set colacionManana(colacionManana){this._colacionManana = colacionManana;}
    set ensalada(ensalada){this._ensalada = ensalada;}
    set almuerzo(almuerzo){this._almuerzo = almuerzo;}
    set postre(postre){this._postre = postre;}
    set colacionTarde(colacionTarde){this._colacionTarde = colacionTarde;}
    set once(once){this._once = once;}
    set cena(cena){this._cena = cena;}
    
    //Metodos de clase
    sumarCalorias(){
        this.caloriasTotales = this._desayuno.calorias + this._colacionManana.calorias + this._ensalada.calorias + this._almuerzo.calorias + this._postre.calorias + this._colacionTarde.calorias + this._once.calorias + this._cena.calorias;
    }
    sumarProteinas(){
        this.proteinasTotales = this._desayuno.proteinas + this._colacionManana.proteinas + this._ensalada.proteinas + this._almuerzo.proteinas + this._postre.proteinas + this._colacionTarde.proteinas + this._once.proteinas + this._cena.proteinas;
    }
    sumarCarbohidratos(){
        this.carbohidratosTotales = this._desayuno.carbohidratos + this._colacionManana.carbohidratos + this._ensalada.carbohidratos + this._almuerzo.carbohidratos + this._postre.carbohidratos + this._colacionTarde.carbohidratos + this._once.carbohidratos + this._cena.carbohidratos;
    }
    sumarLipidos(){
        this.lipidosTotales = this._desayuno.lipidos + this._colacionManana.lipidos + this._ensalada.lipidos + this._almuerzo.lipidos + this._postre.lipidos + this._colacionTarde.lipidos + this._once.lipidos + this._cena.lipidos;
    }
    sumarPrecio(){
        this.precioTotal = this._desayuno.precio + this._colacionManana.precio + this._ensalada.precio + this._almuerzo.precio + this._postre.precio + this._colacionTarde.precio + this._once.precio + this._cena.precio;
    }

}

class Paciente{

    requerimientoCalorico;
    requerimientoProteico;
    requerimientoCarbohidratos;
    requerimientoLipidos;

    constructor(peso, altura, edad, genero, actFisica, ){
        this._peso = peso;
        this._altura = altura;
        this._edad = edad;
        this._genero = genero;
        this._actividadFisica = actFisica;
    }
    
    get peso(){return this._peso;}
    get altura(){return this._altura;}
    get edad(){return this._edad;}
    get genero(){return this._genero;}
    get actividadFisica(){return this._actividadFisica;}

    set peso(peso){this._peso = peso;}
    set altura(altura){this._altura = altura;}
    set edad(edad){this._edad = edad;}
    set genero(genero){this._genero = genero;}
    set actividadFisica(actividadFisica){this._actividadFisica = actividadFisica;}

}
