const container = document.querySelector('#container');
const resetBtn = document.querySelector('#reset-btn');

// Función principal para crear el grid
function createGrid(size = 16) {
    // 1. Limpiamos el contenedor para que no se acumulen grids
    container.innerHTML = '';

    // 2. Calculamos el tamaño de cada cuadradito
    // Como el contenedor mide 960px, dividimos 960 entre el número de cuadros
    const squareSize = 960 / size;

    // 3. Bucle para crear los cuadraditos (size * size)
    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        
        // Le asignamos el ancho y alto exactos
        square.style.width = `${squareSize}px`;
        square.style.height = `${squareSize}px`;

        // Añadimos el evento para pintar al pasar el mouse (Hover)
        square.addEventListener('mouseover', () => {
            // --- EXTRA CRÉDITO ---
            // Si el cuadro no tiene color aún, le asignamos uno aleatorio
            if (!square.style.backgroundColor) {
                const r = Math.floor(Math.random() * 256);
                const g = Math.floor(Math.random() * 256);
                const b = Math.floor(Math.random() * 256);
                square.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
            }
            
            // Efecto de oscurecimiento progresivo (aumenta opacidad 10% cada vez)
            let currentOpacity = parseFloat(square.style.opacity) || 0;
            if (currentOpacity < 1) {
                square.style.opacity = (currentOpacity + 0.1).toString();
            }
        });

        // Agregamos el cuadradito al contenedor
        container.appendChild(square);
    }
}

// Evento para el botón de reiniciar
resetBtn.addEventListener('click', () => {
    let newSize = prompt("¿De qué tamaño quieres el nuevo grid? (Máximo 100)");
    
    // Convertimos el texto a número
    newSize = parseInt(newSize);

    // Validamos que sea un número y que esté entre 1 y 100
    if (newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else if (newSize > 100) {
        alert("El número es muy alto. Se usará el máximo de 100.");
        createGrid(100);
    } else if (!isNaN(newSize)) {
        alert("Por favor, ingresa un número válido.");
    }
});

// Iniciar el juego con un grid de 16x16 por defecto
createGrid(16);