const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 10;
let offset = 0;
const maxRecords = 151;

const tipoIcones = {
    normal: '⚪',
    fire: '🔥',
    water: '💧',
    grass: '🌿',
    electric: '⚡',
    ice: '❄️',
    fighting: '👊',
    poison: '☠️',
    ground: '🌍',
    flying: '🕊️',
    psychic: '🔮',
    bug: '🐛',
    rock: '🪨',
    ghost: '👻',
    dragon: '🐉',
    dark: '🌙',
    steel: '🔩',
    fairy: '🧚'
};

function convertPokemonToLi(pokemon) {
    const mainType = pokemon.types[0];
    const hp = pokemon.stats.hp || 0 
    const attack = pokemon.stats.attack || 0
    const defense = pokemon.stats.defense || 0
    const specialAttack = pokemon.stats['special-attack'] || 0
    const specialDefense = pokemon.stats['special-defense'] || 0
    const speed = pokemon.stats.speed || 0

    return `
        <li class="pokemon ${mainType}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">${pokemon.types.map((type) => `<li class="type ${type}">${tipoIcones[type] || ''} ${type}</li>`).join('')}</ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

        <div class="stats-container">
            <div class="stats">
                <div class="stat">
                    <span class="stat-label">HP</span>
                    <span class="stat-value">${hp}</span>
                    <div class="stat-bar">
                        <div class="stat-bar-fill" style="width: ${hp}%"></div>
                    </div>
                </div>
                <div class="stat">
                    <span class="stat-label">Attack</span>
                    <span class="stat-value">${attack}</span>
                    <div class="stat-bar">
                        <div class="stat-bar-fill" style="width: ${attack}%"></div>
                    </div>
                </div>
                <div class="stat">
                    <span class="stat-label">Defense</span>
                    <span class="stat-value">${defense}</span>
                    <div class="stat-bar">
                        <div class="stat-bar-fill" style="width: ${defense}%"></div>
                    </div>
                </div>
            <div class="stat">
                    <span class="stat-label">S.ATK</span>
                    <span class="stat-value">${specialAttack}</span>
                    <div class="stat-bar">
                        <div class="stat-bar-fill" style="width: ${specialAttack}%"></div>
                    </div>
            </div>
            <div class="stat">
                    <span class="stat-label">S.DEF</span>
                    <span class="stat-value">${specialDefense}</span>
                    <div class="stat-bar">
                        <div class="stat-bar-fill" style="width: ${specialDefense}%"></div>
                    </div>
            </div>
            <div class="stat">
                    <span class="stat-label">SPD</span>
                    <span class="stat-value">${speed}</span>
                    <div class="stat-bar">
                        <div class="stat-bar-fill" style="width: ${speed}%"></div>
                    </div>
            </div>
            </div>
        </div>
                <button class="toggle-stat-btn" onclick="toggleStats(this)">
                    <span class="arrow">☰</span>
                </button>
        </li>
    `;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        
        if (offset === 0) {
            pokemonList.innerHTML = newHtml;
        } else {
            pokemonList.innerHTML += newHtml;
        }
    });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItens(offset, limit);
    }
});

function toggleStats(button) {
    const pokemonCard = button.closest('.pokemon');

    const statsContainer = pokemonCard.querySelector('.stats-container');

    statsContainer.classList.toggle('open');
    button.classList.toggle('open');
}
