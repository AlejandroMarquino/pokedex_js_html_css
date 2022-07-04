const cardPokemon = document.querySelector('[data-card-pokemon');
const namePokemon = document.querySelector('[data-name-pokemon');
const imgPokemon = document.querySelector('[data-img-pokemon');
const imgContainerPokemon = document.querySelector('[data-img-pokemon-container');
const idPokemon = document.querySelector('[data-id-pokemon');
const typesPokemon = document.querySelector('[data-types-pokemon');
const statsPokemon = document.querySelector('[data-stats-pokemon');

const typePokemonColor = {
    default: '#ffffff',
    normal: '#e3e1e2',
    fire: '#d43939',
    water: '#4a5fcc',
    grass: '#39fd6b',
    ice: '#80859e',
    electric: '#f9dc36',
    poison: '#b32cbb',
    rock: '#7f7f81',
    flying: '#95e0d8',
    psychic: '#ebb6c8',
    ghost: '#481d23',
    bug: '#406341',
    dragon: '#ac540d',
    ground: '#b29665',
    fighting: '#352b2b',
    steel: '#617e8c',
};

const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
       fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
       // toLoweCase por si el user introduce alguna mayúscula o todo el nombre en mayúscula que lo convierta a lowercase
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const { stats, types } = data;

    namePokemon.textContent = data.name;
    imgPokemon.setAttribute('src', sprite);
    idPokemon.textContent = `Nº ${data.id}`;
    setColorCard(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}

const setColorCard = types => {
    const colorOne = typePokemonColor[types[0].type.name];
    const colorTwo = types[1] ? typePokemonColor[types[1].type.name] : typePokemonColor.default;
    imgPokemon.style.background = `radial-gradient(${colorTwo} 20%, ${colorOne})`;
    imgPokemon.style.backgroundSize = ' 5px 5 px'
}

const renderPokemonTypes = types => {
    typesPokemon.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typePokemonColor[type.type.name];
        typeTextElement.textContent = type.type.name;
        typesPokemon.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
        statsPokemon.innerHTML = '';
        stats.forEach(stat => {
            const statElement = document.createElement("div");
            const statElementName = document.createElement("div");
            const statElementAmount = document.createElement("div");
            statElementName.textContent = stat.stat.name;
            statElementAmount.textContent = stat.base_stat;
            statElement.appendChild(statElementName);
            statElement.appendChild(statElementAmount);
            statsPokemon.appendChild(statElement);
        
    });
}

// por si el usuario no escribe nada
const renderNotFound = () => {
    namePokemon.textContent = 'No encontrado';
    imgPokemon.setAttribute('src', './profesor-pokemo.jpg');
    imgPokemon.style.background =  '#fff';
    typesPokemon.innerHTML = '';
    statsPokemon.innerHTML = '';
    idPokemon.textContent = '';
}

