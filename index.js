// Container, in dem die Pokémon-Karten hinzugefügt werden sollen
const pokemonContainer = document.getElementById('pokemon-container');
let searchFlag = false;
let searched;
//input
const pokemonSearch = document.getElementById("pokesearch")
pokemonSearch.addEventListener("input", function () {

    if (pokemonSearch.value === "") {
        searchFlag = false;
    }
    else {
        searchFlag = true;
    }
    console.log(pokemonSearch.value);
    pokemonContainer.innerHTML = "";
    displayPokemons(pokemonSearch.value);
})

// Funktion, um die Daten eines einzelnen Pokémon von der API abzurufen
async function fetchPokemon(param) {
    if (param === undefined) {
        return
    }
    try {
        // Abruf der Pokémon-Daten anhand der ID
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${param}`);
        const pokemon = await response.json(); // Umwandlung der Antwort in ein JSON-Objekt
        // Die Daten des Pokémon werden zurückgegeben
        return pokemon;
    } catch (error) {
        // Fehlerbehandlung, falls die API-Anfrage fehlschlägt
        console.error('Error fetching pokemons', error);
    }

}

async function fetchByName(pokemonName) {
    if (pokemonName === "") {
        return
    }
    try {
        // Abruf der Pokémon-Daten anhand der ID
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const pokemon = await response.json(); // Umwandlung der Antwort in ein JSON-Objekt
        // Die Daten des Pokémon mit dem Namen wird zurückgegeben
        return pokemon;
    } catch (error) {
        // Fehlerbehandlung, falls die API-Anfrage fehlschlägt
        console.error('Error fetching pokemonName', error);
    }
}
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

// YAKUP Kalkan
// Funktion, um Pokémon-Karten anzuzeigen
async function displayPokemons(searched) {
    console.log(searched)

    if (searchFlag) {
        console.log(searchFlag);
        // Abrufen der Pokémon-Daten für die aktuelle ID
        const pokemon = await fetchByName(searched);
        console.log(pokemon);
        if (pokemon) {
            // Erstellen einer Karte für das Pokémon
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add(
                'bg-white',
                'rounded-lg',
                'shadow-lg',
                'border-2',
                'p-4',
                'flex',
                'flex-col',
                'items-center',
                'text-center'
            );
            pokemonCard.style.aspectRatio = "3/4";

            const pokemonCardHeader = document.createElement('div');
            pokemonCardHeader.classList.add(
                'w-full',
                'h-10',
                'flex',
                'justify-end',
                'border',
                'border-gray-300',
                'mb-2',
                'pr-2',
                'rounded-lg'
            );

            // favorite Button
            const favoriteButton = document.createElement('button');
            favoriteButton.classList.add(
                "top-2",
                "right-2",
                "border-0",
                "bg-transparent",
                "text-2xl",
                "cursor-pointer",
                "text-gray-500"
            );
            favoriteButton.textContent = "★";



            // favorite Button click event
            favoriteButton.addEventListener('click', () => {
                if (favoriteButton.style.color === "gold") {
                    favoriteButton.style.color = "gray";
                    // call function to remove it into the favorites list
                } else {
                    favoriteButton.style.color = "gold";
                    // call function to add it into the favorites list
                }
            });

            pokemonCardHeader.appendChild(favoriteButton);

            const pokemonCardImage = document.createElement('div');
            pokemonCardImage.classList.add(
                'w-full',
                'h-1/2',
                'bg-white',
                'rounded-lg',
                'border-2',
                'p-10',
                'flex',
                'flex-col',
                'justify-center',
                'text-center',
            );


            // Hinzufügen des Pokémon-Bildes
            const pokemonImage = document.createElement('img');
            // URL des Bildes wird aus den Pokémon-Daten entnommen
            pokemonImage.src = pokemon.sprites.other.showdown.front_shiny;
            pokemonImage.alt = pokemon.name;
            pokemonImage.classList.add('w-24', 'h-24');

            pokemonCardImage.appendChild(pokemonImage);


            // Hinzufügen des Pokémon-Namens
            const pokemonName = document.createElement('h2');
            pokemonName.textContent = pokemon.name; // Name des Pokémon
            pokemonName.classList.add('text-xl', 'font-bold', 'mb-2'); // Styling für den Namen

            const pokemonCardInfo = document.createElement('div');
            pokemonCardInfo.classList.add(
                'w-full',
                'h-20',
                'flex',
                'justify-center',
                'border',
                'border-gray-300',
                'rounded-lg'
            );
            // Hinzufügen von Informationen wie ID und Typ
            const pokemonInfo = document.createElement('p');
            pokemonInfo.textContent = `ID: ${pokemon.id} | Type: ${pokemon.types
                .map((typeInfo) => typeInfo.type.name) // Typen des Pokémon abrufen
                .join(', ') // Typen in eine durch Kommas getrennte Liste umwandeln
                .toUpperCase()}`; // Typen in Großbuchstaben konvertieren

            pokemonCardInfo.appendChild(pokemonInfo)

            // Zusammenfügen der einzelnen Teile zur vollständigen Karte
            pokemonCard.appendChild(pokemonCardHeader);
            pokemonCard.appendChild(pokemonCardImage);
            pokemonCard.appendChild(pokemonName);
            pokemonCard.appendChild(pokemonCardInfo);

            // Hinzufügen der Karte zum Container
            pokemonContainer.appendChild(pokemonCard);

        }
    }
    else {
        // Schleife, um die ersten 150 Pokémon (ID: 1 bis 150) zu durchlaufen
        for (let i = 1; i <= 150; i++) {
            // Abrufen der Pokémon-Daten für die aktuelle ID
            const pokemon = await fetchPokemon(i);

            // Nur fortfahren, wenn die Daten erfolgreich abgerufen wurden
            if (pokemon) {
                // Erstellen einer Karte für das Pokémon
                const pokemonCard = document.createElement('div');
                pokemonCard.classList.add(
                    'bg-white',
                    'rounded-lg',
                    'shadow-lg',
                    'border-2',
                    'p-4',
                    'flex',
                    'flex-col',
                    'items-center',
                    'text-center'
                );
                pokemonCard.style.aspectRatio = "3/4";

                const pokemonCardHeader = document.createElement('div');
                pokemonCardHeader.classList.add(
                    'w-full',
                    'h-10',
                    'flex',
                    'justify-end',
                    'border',
                    'border-gray-300',
                    'mb-2',
                    'pr-2',
                    'rounded-lg'
                );

                // favorite Button
                const favoriteButton = document.createElement('button');
                favoriteButton.classList.add(
                    "top-2",
                    "right-2",
                    "border-0",
                    "bg-transparent",
                    "text-2xl",
                    "cursor-pointer",
                    "text-gray-500"
                );
                favoriteButton.textContent = "★";

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

                pokemonCardHeader.appendChild(favoriteButton);

                const pokemonCardImage = document.createElement('div');
                pokemonCardImage.classList.add(
                    'w-full',
                    'h-1/2',
                    'bg-white',
                    'rounded-lg',
                    'border-2',
                    'p-10',
                    'flex',
                    'flex-col',
                    'justify-center',
                    'text-center',
                );


                // Hinzufügen des Pokémon-Bildes
                const pokemonImage = document.createElement('img');
                // URL des Bildes wird aus den Pokémon-Daten entnommen
                pokemonImage.src = pokemon.sprites.other.showdown.front_shiny;
                pokemonImage.alt = pokemon.name;
                pokemonImage.classList.add('w-24', 'h-24');

                pokemonCardImage.appendChild(pokemonImage);


                // Hinzufügen des Pokémon-Namens
                const pokemonName = document.createElement('h2');
                pokemonName.textContent = pokemon.name; // Name des Pokémon
                pokemonName.classList.add('text-xl', 'font-bold', 'mb-2'); // Styling für den Namen

                const pokemonCardInfo = document.createElement('div');
                pokemonCardInfo.classList.add(
                    'w-full',
                    'h-20',
                    'flex',
                    'justify-center',
                    'border',
                    'border-gray-300',
                    'rounded-lg'
                );
                // Hinzufügen von Informationen wie ID und Typ
                const pokemonInfo = document.createElement('p');
                pokemonInfo.textContent = `ID: ${pokemon.id} | Type: ${pokemon.types
                    .map((typeInfo) => typeInfo.type.name) // Typen des Pokémon abrufen
                    .join(', ') // Typen in eine durch Kommas getrennte Liste umwandeln
                    .toUpperCase()}`; // Typen in Großbuchstaben konvertieren

                pokemonCardInfo.appendChild(pokemonInfo)

                // Zusammenfügen der einzelnen Teile zur vollständigen Karte
                pokemonCard.appendChild(pokemonCardHeader);
                pokemonCard.appendChild(pokemonCardImage);
                pokemonCard.appendChild(pokemonName);
                pokemonCard.appendChild(pokemonCardInfo);

                // Hinzufügen der Karte zum Container
                pokemonContainer.appendChild(pokemonCard);

                // Abrufen der Pokémon-Daten für die aktuelle ID

                // Erstellen einer Karte für das Pokémon
                pokemonCard.classList.add(
                    'bg-white',
                    'rounded-lg',
                    'shadow-lg',
                    'border-2',
                    'p-4',
                    'flex',
                    'flex-col',
                    'items-center',
                    'text-center'
                );
                pokemonCard.style.aspectRatio = "3/4";

                pokemonCardHeader.classList.add(
                    'w-full',
                    'h-10',
                    'flex',
                    'justify-end',
                    'border',
                    'border-gray-300',
                    'mb-2',
                    'pr-2',
                    'rounded-lg'
                );

                // favorite Button
                favoriteButton.classList.add(
                    "top-2",
                    "right-2",
                    "border-0",
                    "bg-transparent",
                    "text-2xl",
                    "cursor-pointer",
                    "text-gray-500"
                );
                favoriteButton.textContent = "★";

                // favorite Button click event
                favoriteButton.addEventListener('click', () => {
                    if (favoriteButton.style.color === "gold") {
                        favoriteButton.style.color = "gray";
                        // call function to remove it into the favorites list
                    } else {
                        favoriteButton.style.color = "gold";
                        // call function to add it into the favorites list
                    }
                });

                pokemonCardHeader.appendChild(favoriteButton);


                pokemonCardImage.classList.add(
                    'w-full',
                    'h-1/2',
                    'bg-white',
                    'rounded-lg',
                    'border-2',
                    'p-10',
                    'flex',
                    'flex-col',
                    'justify-center',
                    'text-center',
                );


                // Hinzufügen des Pokémon-Bildes
                // URL des Bildes wird aus den Pokémon-Daten entnommen
                pokemonImage.src = pokemon.sprites.other.showdown.front_shiny;
                pokemonImage.alt = pokemon.name;
                pokemonImage.classList.add('w-24', 'h-24');

                pokemonCardImage.appendChild(pokemonImage);

                // Hinzufügen des Pokémon-Namens
                pokemonName.textContent = pokemon.name; // Name des Pokémon
                pokemonName.classList.add('text-xl', 'font-bold', 'mb-1'); // Styling für den Namen
                pokemonCardInfo.classList.add(
                    'w-full',
                    'h-20',
                    'flex',
                    'justify-center',
                    'border',
                    'border-gray-300',
                    'rounded-lg'
                );

                pokemonInfo.textContent = `ID: ${pokemon.id} | Type: ${pokemon.types
                    .map((typeInfo) => typeInfo.type.name) // Typen des Pokémon abrufen
                    .join(', ') // Typen in eine durch Kommas getrennte Liste umwandeln
                    .toUpperCase()}`; // Typen in Großbuchstaben konvertieren

                pokemonCardInfo.appendChild(pokemonInfo)
                // Zusammenfügen der einzelnen Teile zur vollständigen Karte
                pokemonCard.appendChild(pokemonCardHeader);
                pokemonCard.appendChild(pokemonCardImage);
                pokemonCard.appendChild(pokemonName);
                pokemonCard.appendChild(pokemonCardInfo);

                // Hinzufügen der Karte zum Container
                pokemonContainer.appendChild(pokemonCard);
            }
        }
    }
}

displayPokemons(pokemonSearch.value);
