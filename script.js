document.addEventListener('DOMContentLoaded', () => {
    const secciones = document.querySelectorAll('.seccion-datos');
    let pasoActual = 0;

    secciones.forEach((seccion, index) => {
        const botonSiguiente = seccion.querySelector('.boton-siguiente');

        if (botonSiguiente) {
            botonSiguiente.addEventListener('click', () => {
                secciones[pasoActual].classList.remove('activa');

                pasoActual++;
                
                if (pasoActual < secciones.length) {
                    secciones[pasoActual].classList.add('activa');
                }
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const datosEstaciones = {
        namboku: [
            { codigo: "N01", nombre: "Asabu" },
            { codigo: "N02", nombre: "Kita-Sanjuyo-Jo" },
            { codigo: "N03", nombre: "Kita-Nijuyo-Jo" },
            { codigo: "N04", nombre: "Kita-Juhachi-Jo" },
            { codigo: "N05", nombre: "Kita-Juni-Jo" },
            { codigo: "N06", nombre: "Sapporo" },
            { codigo: "N07", nombre: "Odori" },
            { codigo: "N08", nombre: "Susukino" },
            { codigo: "N09", nombre: "Nakajima-Koen" },
            { codigo: "N10", nombre: "Horohira-Bashi" },
            { codigo: "N11", nombre: "Nakanoshima" },
            { codigo: "N12", nombre: "Hiragishi" },
            { codigo: "N13", nombre: "Minami-Hiragishi" },
            { codigo: "N14", nombre: "Sumikawa" },
            { codigo: "N15", nombre: "Jieitai-Mae" },
            { codigo: "N16", nombre: "Makomanai" }
        ],
        tozai: [
            { codigo: "T01", nombre: "Miyanosawa" },
            { codigo: "T02", nombre: "Hassamu-Minami" },
            { codigo: "T03", nombre: "Kotoni" },
            { codigo: "T04", nombre: "Nijuyonken" },
            { codigo: "T05", nombre: "Nishi-Nijuhachi-Cyome" },
            { codigo: "T06", nombre: "Maruyama-Koen" },
            { codigo: "T07", nombre: "Nishi-Jyuhachi-Chome" },
            { codigo: "T08", nombre: "Nishi-Jyuichi-Chome" },
            { codigo: "T09", nombre: "Odori" },
            { codigo: "T10", nombre: "Bus Center Mae" },
            { codigo: "T11", nombre: "Kikusui" },
            { codigo: "T12", nombre: "Higashi-Sapporo" },
            { codigo: "T13", nombre: "Shiroishi" },
            { codigo: "T14", nombre: "Nango-Nana-Chome" },
            { codigo: "T15", nombre: "Nango-Jusan-Chome" },
            { codigo: "T16", nombre: "Nango-Juhachi-Chome" },
            { codigo: "T17", nombre: "Oyachi" },
            { codigo: "T18", nombre: "Hibarigaoka" },
            { codigo: "T19", nombre: "Shin-Sapporo" }
        ],
        toho: [
            { codigo: "H01", nombre: "Sakaemachi" },
            { codigo: "H02", nombre: "Shindo-Higashi" },
            { codigo: "H03", nombre: "Motomachi" },
            { codigo: "H04", nombre: "Kanjyo-Dori-Higashi" },
            { codigo: "H05", nombre: "Higashi-Kuyakusyo-Mae" },
            { codigo: "H06", nombre: "Kita-Jyusan-Jyo-Higashi" },
            { codigo: "H07", nombre: "Sapporo" },
            { codigo: "H08", nombre: "Odori" },
            { codigo: "H09", nombre: "Hosui-Susukino" },
            { codigo: "H10", nombre: "Gakuen-Mae" },
            { codigo: "H11", nombre: "Toyohira-Koen" },
            { codigo: "H12", nombre: "Misono" },
            { codigo: "H13", nombre: "Tsukisamu-Chuo" },
            { codigo: "H14", nombre: "Fukuzumi" }
        ]
    };

    const secciones = document.querySelectorAll('.seccion-datos');
    let pasoActual = 0;

    const selectOrigen = document.getElementById('origen');
    const selectDestino = document.getElementById('destino');
    const labelNombreLinea = document.getElementById('nombre-linea-lbl');
    const contenedorDesplegable = document.getElementById('lista-estaciones-desplegable');

    secciones.forEach((seccion) => {
        const botonSiguiente = seccion.querySelector('.boton-siguiente');

        if (botonSiguiente && botonSiguiente.type !== 'submit') {
            botonSiguiente.addEventListener('click', () => {

                if (pasoActual === 1) {
                    const lineaSeleccionada = document.querySelector('input[name="linea"]:checked');
                    
                    if (!lineaSeleccionada) {
                        alert("Por favor, selecciona una línea de metro antes de continuar.");
                        return;
                    }

                    cargarEstaciones(lineaSeleccionada.value);
                }

                secciones[pasoActual].classList.remove('activa');
                pasoActual++;

                if (pasoActual < secciones.length) {
                    secciones[pasoActual].classList.add('activa');
                }
            });
        }
    });

    function cargarEstaciones(lineaClave) {
        const lista = datosEstaciones[lineaClave] || [];
        
        labelNombreLinea.textContent = lineaClave.toUpperCase();

        contenedorDesplegable.innerHTML = '';
        selectOrigen.innerHTML = '<option value="">-- Selecciona Origen --</option>';
        selectDestino.innerHTML = '<option value="">-- Selecciona Destino --</option>';

        lista.forEach(estacion => {
            const item = document.createElement('div');
            item.className = 'item-estacion';
            item.innerHTML = `
                <span>${estacion.nombre}</span>
                <span class="codigo-estacion">${estacion.codigo}</span>
            `;
            contenedorDesplegable.appendChild(item);

            // Opción para Origen
            const optOrigen = document.createElement('option');
            optOrigen.value = estacion.codigo;
            optOrigen.textContent = `${estacion.codigo} - ${estacion.nombre}`;
            selectOrigen.appendChild(optOrigen);

            // Opción para Destino
            const optDestino = document.createElement('option');
            optDestino.value = estacion.codigo;
            optDestino.textContent = `${estacion.codigo} - ${estacion.nombre}`;
            selectDestino.appendChild(optDestino);
        });
    }

    selectOrigen.addEventListener('change', () => {
        const origenVal = selectOrigen.value;

        Array.from(selectDestino.options).forEach(option => {
            if (!option.value) return;

            if (option.value === origenVal) {
                option.disabled = true;
                option.hidden = true; 
            } else {
                option.disabled = false;
                option.hidden = false;
            }
        });

        if (selectDestino.value === origenVal) {
            selectDestino.value = '';
        }
    });
});

const formEstaciones = document.querySelector('.estaciones');

    formEstaciones.addEventListener('submit', (e) => {
        e.preventDefault();

    const selectOrigen = document.getElementById('origen');
    const selectDestino = document.getElementById('destino');
    const lineaSeleccionada = document.querySelector('input[name="linea"]:checked');

    const origenText = selectOrigen.options[selectOrigen.selectedIndex]?.text || '';
    const destinoText = selectDestino.options[selectDestino.selectedIndex]?.text || '';

    if (!selectOrigen.value || !selectDestino.value) {
        alert("Por favor, selecciona tanto la estación de origen como la de destino.");
        return;
    }

    const datosBoleto = {
        nombres: document.getElementById('nombres').value || 'N/A',
        apellidos: document.getElementById('apellidos').value || 'N/A',
        email: document.getElementById('email').value || 'N/A',
        direccion: document.getElementById('direccion').value || 'N/A',
        nit: document.getElementById('nit').value || 'C/F',
        linea: lineaSeleccionada ? lineaSeleccionada.value.toUpperCase() : 'N/A',
        origen: origenText,
        destino: destinoText,
        tarifa: "400 ¥" // Tarifa hardcodeada a 400 yenes
    };

    localStorage.setItem('boletoSapporo', JSON.stringify(datosBoleto));
    
    window.location.href = './boleto.html';
});