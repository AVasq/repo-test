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

let alimento1 = new Alimento(1, "Almuerzo", "Vacuno", "Cazuela de Vacuno", 343, 28, 36, 10, 508, 172, "Una rica sopa de carne, papas y verduras")
alimento1.descripcionNutricional();
alimento1.multiplicarFactor(2);
alimento1.descripcionNutricional();