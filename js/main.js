// 1 año de perro son 15 años humanos (hasta los 2 años)
// 1 año de perro son 10 años humanos (desde los 2 años)
class perro {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    calculoEdadHumana() {
        if (this.edad <= 2) {
            return this.edad * 15;
        } else {
            return 30 + (this.edad - 2) * 10;
        }
    }
}

let perros = [];

function capturarDatosPerro() {
    let nombre = prompt("Ingresa el nombre de tu perro:");
    let edad;
    do {
        edad = prompt("Ingresa la edad de " + nombre + " (en años):");
    } while (isNaN(edad) || edad < 0);
    
    return new perro(nombre, parseInt(edad, 10));
}
function agregarPerro(perro) {
    perros.push(perro);
}
function mostrarResultados(perro) {
    alert(perro.nombre + " tiene " + perro.calculoEdadHumana() + " años humanos.");
    console.log("Nombre: " + perro.nombre + ", Edad humana: " + perro.calculoEdadHumana());
}
function buscarPerroPorNombre(nombre) {
    return perros.filter(perro => perro.nombre.toLowerCase() === nombre.toLowerCase());
}
function activarCalculadora() {
    let perro = capturarDatosPerro();
    agregarPerro(perro);
    mostrarResultados(perro);
    
    if (confirm("¿Quieres calcular la edad de otro perro?")) {
        activarCalculadora();
    } else {
        let buscar = prompt("¿Quieres buscar la edad de un perro registrado por nombre? (si/no)").toLowerCase();
        if (buscar === "si") {
            let nombreBusqueda = prompt("Ingresa el nombre del perro que deseas buscar:");
            let resultados = buscarPerroPorNombre(nombreBusqueda);
            if (resultados.length > 0) {
                resultados.forEach(mostrarResultados);
            } else {
                alert("No se encontró un perro con ese nombre.");
            }
        }
        alert("Gracias por usar la calculadora de edad de perros.");
    }
}

activarCalculadora();
