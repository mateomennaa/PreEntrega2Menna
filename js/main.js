document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioPerro');
    const nombreInput = document.getElementById('nombre');
    const edadInput = document.getElementById('edad');
    const resultadoDiv = document.getElementById('resultado');
    const buscarInput = document.getElementById('buscarPerroNombre');
    const buscarBtn = document.getElementById('buscarPerro');
    const limpiarBtn = document.getElementById('limpiarRegistro');

    let perros = JSON.parse(localStorage.getItem('perros')) || [];

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombre = nombreInput.value.trim();
        const edad = parseInt(edadInput.value.trim(), 10);

        if (nombre && !isNaN(edad) && edad >= 0) {
            const perro = new Perro(nombre, edad);
            agregarPerro(perro);
            mostrarResultadosPerro(perro);
        } else {
            mostrarAlerta('Por favor, ingresa un nombre válido y una edad válida.', 'error');
        }
    });

    buscarBtn.addEventListener('click', () => {
        const nombreBusqueda = buscarInput.value.trim();
        if (nombreBusqueda) {
            const resultados = buscarPerroPorNombre(nombreBusqueda);
            if (resultados.length > 0) {
                resultadoDiv.innerHTML = '';
                resultados.forEach(mostrarResultadosPerro);
            } else {
                mostrarAlerta('No se encontró un perro con ese nombre.', 'info');
            }
        }
    });

    limpiarBtn.addEventListener('click', () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Se eliminarán todos los perros del registro.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, limpiar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('perros');
                perros = [];
                resultadoDiv.innerHTML = '<p>Registro de perros limpiado.</p>';
                Swal.fire('Registro de perros limpiado con éxito.', '', 'success');
            }
        });
    });

    function agregarPerro(perro) {
        perros.push(perro);
        localStorage.setItem('perros', JSON.stringify(perros));
    }

    function mostrarResultadosPerro(perro) {
        resultadoDiv.innerHTML = ''; 
        resultadoDiv.innerHTML += `<p>${perro.nombre} tiene aproximadamente ${perro.calculoEdadHumana()} años humanos.</p>`;
    }

    function buscarPerroPorNombre(nombre) {
        const nombreBusqueda = nombre.trim().toLowerCase();
        return perros.filter(perro => perro.nombre.toLowerCase().includes(nombreBusqueda));
    }

    class Perro {
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
    const formularioClima = document.getElementById('formularioClima');
    const ciudadInput = document.getElementById('ciudad');
    const resultadoClimaDiv = document.getElementById('resultadoClima');
    const API_KEY = 'efc0ff73ffae79ecc9e48fe6649784ee'; 

    formularioClima.addEventListener('submit', (e) => {
        e.preventDefault();
        const ciudad = ciudadInput.value.trim();
        if (ciudad) {
            obtenerClimaPorCiudad(ciudad);
        } else {
            mostrarAlerta('Por favor, ingresa una ciudad válida.', 'error');
        }
    });

        const obtenerClimaPorCiudad = (ciudad) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    const { main, weather } = data;
                    const mensajeClima = `La temperatura en ${ciudad} es de ${main.temp}°C. Condiciones: ${weather[0].description}.`;
                    mostrarResultadosClima(mensajeClima);
                } else {
                    mostrarAlerta('No se pudo obtener el clima. Verifica la ciudad ingresada.', 'error');
                }
            })
            .catch(error => {
                mostrarAlerta('Error al conectar con el servicio de clima.', 'error');
            });
    };

    const mostrarResultadosClima = (mensaje) => {
        resultadoClimaDiv.innerHTML = `<p>${mensaje}</p>`;
    };

    const mostrarAlerta = (mensaje, tipo) => {
        Swal.fire({
            text: mensaje,
            icon: tipo,
            confirmButtonText: 'Aceptar'
        });
    };
});
