document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.getElementById('cards-container');
    const characterFilter = document.getElementById('character-filter');
    let characters = [];

    // Función para obtener los personajes de la API
    async function fetchCharacters() {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character/');
            const data = await response.json();
            characters = data.results.slice(0, 16); // Tomamos solo los primeros 16 personajes
            displayCharacters(characters);
            populateFilter(characters);
        } catch (error) {
            console.error('Error fetching characters:', error);
            cardsContainer.innerHTML = '<p class="error-message">ERROR: FAILED TO LOAD INTERDIMENSIONAL DATA</p>';
        }
    }

    // Función para mostrar los personajes en las cards
    function displayCharacters(charactersToDisplay) {
        cardsContainer.innerHTML = '';
        
        charactersToDisplay.forEach(character => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.id = character.id;
            
            // Determinar clase de estado para el badge
            let statusClass = '';
            if (character.status === 'Alive') {
                statusClass = 'status-alive';
            } else if (character.status === 'Dead') {
                statusClass = 'status-dead';
            } else {
                statusClass = 'status-unknown';
            }
            
            card.innerHTML = `
                <span class="badge ${statusClass}">${character.status}</span>
                <img src="${character.image}" alt="${character.name}" class="card-img">
                <div class="card-content">
                    <h3 class="card-title">${character.name}</h3>
                    <p class="card-text">Species: ${character.species}</p>
                    <p class="card-text">Origin: ${character.origin.name}</p>
                    <p class="card-text">Last seen: ${character.location.name}</p>
                </div>
            `;
            
            cardsContainer.appendChild(card);
        });
    }

    // Función para poblar el filtro con los nombres de los personajes
    function populateFilter(characters) {
        characters.forEach(character => {
            const option = document.createElement('option');
            option.value = character.id;
            option.textContent = character.name;
            characterFilter.appendChild(option);
        });
    }

    // Event listener para el filtro
    characterFilter.addEventListener('change', (e) => {
        if (e.target.value === 'all') {
            displayCharacters(characters);
        } else {
            const selectedCharacter = characters.find(char => char.id === parseInt(e.target.value));
            displayCharacters([selectedCharacter]);
        }
    });

    // Asegurar que el select mantenga el estilo correcto
    characterFilter.addEventListener('focus', () => {
        characterFilter.style.color = 'white';
    });

    characterFilter.addEventListener('blur', () => {
        characterFilter.style.color = 'white';
    });

    // Inicializar la aplicación
    fetchCharacters();
});