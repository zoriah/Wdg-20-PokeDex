const favoritePokemons = JSON.parse(localStorage.getItem('favorites'))
// console.log(typeof favoritePokemons)
const pokemonContainer = document.getElementById('pokemon-container');

let favoriteButtonFlag = true

async function fetchPokemon(id) {
    if (id === undefined) {
        return
    }
    try {
        // Abruf der Pokémon-Daten anhand der ID
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await response.json(); // Umwandlung der Antwort in ein JSON-Objekt
        // Die Daten des Pokémon werden zurückgegeben
        return pokemon;
    } catch (error) {
        // Fehlerbehandlung, falls die API-Anfrage fehlschlägt
        console.error('Error fetching pokemons', error);
    }
}

const pokemons = favoritePokemons.map(pokemon => fetchPokemon(pokemon))
console.log("Noa: " + pokemons)

//Naci
function removeItemFromFavorites(pokemonName) {
    let favorites = localStorage.getItem('favorites');

    favorites = favorites ? JSON.parse(favorites) : [];

    if (favorites.includes(pokemonName)) {
        favorites = favorites.filter(x => x != pokemonName);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        console.log(`${pokemonName}was deleted`);
    }
    else {
        console.log('it does not exist');
    }
}
//Bahman
function addToFavorites(pokemonName) {

    let favorites = localStorage.getItem('favorites');

    favorites = favorites ? JSON.parse(favorites) : [];

    if (!favorites.includes(pokemonName)) {
        favorites.push(pokemonName); // Name zur Liste hinzufügen
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Favoritenliste speichern
    } else {
        console.log(`Pokémon mit dem Namen ${pokemonName} ist bereits in der Favoritenliste.`);
    }
}

function pokemonCardCreator(pokemon){
    const pokemonCard = document.createElement('div');
    pokemonCard.classList.add('bg-white', 'rounded-lg', 'shadow-lg', 'border-2', 'p-4', 'text-center', 'flex', 'flex-col');
    pokemonCard.style.width = "280px";

    // Header: Pokémon adı ve HP
    const header = document.createElement('div');
    header.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
    header.style.borderBottom = "1px solid gray";
    header.style.paddingBottom = "5px";

    const pokemonName = document.createElement('h2');
    pokemonName.textContent = pokemon.name.toUpperCase();
    pokemonName.classList.add('text-xl', 'font-bold');

    const pokemonHP = document.createElement('span');
    const hpStat = pokemon.stats.find(stat => stat.stat.name === 'hp').base_stat;
    pokemonHP.textContent = `HP: ${hpStat}`;
    pokemonHP.classList.add('font-semibold', 'text-red-500');

    header.appendChild(pokemonName);
    header.appendChild(pokemonHP);

    const pokeTypeUndfavorite = document.createElement('div');
    pokeTypeUndfavorite.classList.add('w-full','h-10','flex', 'items-center', 'justify-between');
    
    // Type 
    const typeDiv = document.createElement('p');
    const types = pokemon.types.map(type => type.type.name).join(', ').toUpperCase();
    typeDiv.textContent = `Type: ${types}`;
    typeDiv.classList.add('text-center','text-gray-600');

    const favoriteButton = document.createElement('button');
    favoriteButton.classList.add("bg-transparent", "text-4xl", "cursor-pointer", "text-gray-500");
    favoriteButton.textContent = "★";
    favoriteButton.style.color = "gold";

    // favorite Button click event
    favoriteButton.addEventListener('click', () => {
        if (favoriteButton.style.color === "gold") {
            favoriteButton.style.color = "gray";
            // call function to remove it into the favorites list
            removeItemFromFavorites(pokemon.name);
        } else {
            favoriteButton.style.color = "gold";
            // call function to add it into the favorites list
            addToFavorites(pokemon.name);
        }
    });

    pokeTypeUndfavorite.appendChild(typeDiv);
    pokeTypeUndfavorite.appendChild(favoriteButton);

    // image
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('w-full', 'h-40','flex', 'justify-center', 'mb-4');
    const pokemonImage = document.createElement('img');
    //pokemonImage.src = pokemon.sprites.other['official-artwork'].front_default;
    pokemonImage.src = pokemon.sprites.other.showdown.front_shiny;
    pokemonImage.alt = pokemon.name;
    pokemonImage.style.width = "150px";
    imageDiv.appendChild(pokemonImage);

    // Attack and Defense
    const statsDiv = document.createElement('div');
    statsDiv.classList.add('text-sm', 'mb-4');
    const attackStat = pokemon.stats.find(stat => stat.stat.name === 'attack').base_stat;
    const defenseStat = pokemon.stats.find(stat => stat.stat.name === 'defense').base_stat;
    statsDiv.innerHTML = `<p>Attack: ${attackStat} | Defense: ${defenseStat}</p>`;

    // Abilities
    const abilitiesDiv = document.createElement('div');
    abilitiesDiv.classList.add('text-sm', 'mb-4', 'text-left');
    abilitiesDiv.innerHTML = `
        <p><strong>Abilities:</strong></p>
        <ul>
            ${pokemon.abilities.map(ability => `<li>- ${ability.ability.name}</li>`).join('')}
        </ul>
    `;

    // height and weight
    const dimensionsDiv = document.createElement('div');
    dimensionsDiv.classList.add('text-sm', 'mb-4');
    dimensionsDiv.textContent = `Height: ${(pokemon.height / 10).toFixed(1)} m | Weight: ${(pokemon.weight / 10).toFixed(1)} kg`;


    pokemonCard.appendChild(header);
    pokemonCard.appendChild(pokeTypeUndfavorite)
    pokemonCard.appendChild(imageDiv);
    pokemonCard.appendChild(statsDiv);
    pokemonCard.appendChild(dimensionsDiv);
    pokemonCard.appendChild(abilitiesDiv);

    return pokemonCard;
}

async function displayPokemons() {

    // Schleife, um die favoritePokemons auszulesen
    pokemons.forEach(pokemon => {

        pokemon.then(pokemon => {
            // Nur fortfahren, wenn die Daten erfolgreich abgerufen wurden
            if (pokemon) {
                pokemonContainer.appendChild(pokemonCardCreator(pokemon));
            }
        })
    })
}

displayPokemons()