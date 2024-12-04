// Container, in dem die Pokémon-Karten hinzugefügt werden sollen
const pokemonContainer = document.getElementById('pokemon-container');

//input
const pokemonSearch = document.getElementById("pokesearch")
const searched = pokemonSearch.addEventListener("input", function () {

    if (pokemonSearch.value === null) {
        return
    }

    console.log(pokemonSearch.value)
    return pokemonSearch.value
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



// YAKUP Kalkan
// Funktion, um Pokémon-Karten anzuzeigen
async function displayPokemons(param) {
    const pokemon = await fetchPokemon();
    // Hinzufügen von Informationen wie ID und Typ
    const pokemonInfo = document.createElement('p');
    const pokemonCard = document.createElement('div');
    const pokemonCardHeader = document.createElement('div');
    const favoriteButton = document.createElement('button');
    const pokemonCardImage = document.createElement('div');
    const pokemonImage = document.createElement('img');
    const pokemonName = document.createElement('h2');
    const pokemonCardInfo = document.createElement('div');

    if (param === undefined) {
        // Abrufen der Pokémon-Daten für die aktuelle ID
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
        // Abrufen der Pokémon-Daten für die aktuelle ID
        const pokemon = await fetchPokemon();

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

displayPokemons(searched);