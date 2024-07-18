// 1 año de perro son 15 años humanos (hasta los 2 años)
// 1 año de perro son 10 años humanos (desde los 2 años)
function activarcalculadora(){
    let edad;
do {
    edad = prompt("Ingresa la edad de tu perro");
} while (isNaN(edad));
function calculoedadhumana(edad) {
    if (edad <= 2) {
        return edad * 15;
    } else {
        return 30 + (edad - 2) * 10; 
    }
}
const edadhumana = calculoedadhumana(edad);
alert("Tu perro tiene " + edadhumana + " años humanos.");
if (confirm("¿queres volver a calcular?")){
    activarcalculadora();
}
}
activarcalculadora();