document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioPerro');
    const nombreInput = document.getElementById('nombre');
    const edadInput = document.getElementById('edad');
    const resultadoDiv = document.getElementById('resultado');
    const buscarInput = document.getElementById('buscarPerroNombre');
    const buscarBtn = document.getElementById('buscarPerro');
    const limpiarBtn = document.getElementById('limpiarRegistro');

    let perros = JSON.parse(localStorage.getItem('perros')) || [];

    formulario.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const nombre = nombreInput.value.trim();
        const edad = parseInt(edadInput.value.trim(), 10);

        if (nombre && !isNaN(edad) && edad >= 0) {
            const perro = new Perro(nombre, edad);
            agregarPerro(perro);
            mostrarResultados(perro);
        } else {
            resultadoDiv.innerHTML = '<p>Por favor, ingresa un nombre válido y una edad válida.</p>';
        }
    });

    buscarBtn.addEventListener('click', () => {
        const nombreBusqueda = buscarInput.value.trim();
        if (nombreBusqueda) {
            const resultados = buscarPerroPorNombre(nombreBusqueda);
            if (resultados.length > 0) {
                resultadoDiv.innerHTML = '';
                resultados.forEach(mostrarResultados);
            } else {
                resultadoDiv.innerHTML = '<p>No se encontró un perro con ese nombre.</p>';
            }
        }
    });

    limpiarBtn.addEventListener('click', () => {
        localStorage.removeItem('perros');
        perros = [];
        resultadoDiv.innerHTML = '<p>Registro de perros limpiado.</p>';
    });

    function agregarPerro(perro) {
        perros.push(perro);
        localStorage.setItem('perros', JSON.stringify(perros));
    }

    function mostrarResultados(perro) {
        resultadoDiv.innerHTML += `<p>El resultado es:</p><p>${perro.nombre} tiene aproximadamente ${perro.calculoEdadHumana()} años humanos.</p>`;
    }

    function buscarPerroPorNombre(nombre) {
        return perros.filter(perro => perro.nombre.toLowerCase() === nombre.toLowerCase());
    }

    function Perro(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    Perro.prototype.calculoEdadHumana = function() {
        if (this.edad <= 2) {
            return this.edad * 15;
        } else {
            return 30 + (this.edad - 2) * 10;
        }
    };
});

