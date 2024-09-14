document.addEventListener("DOMContentLoaded", () => {
    const pokemonImage = document.getElementById("pokemon-img");
    const choicesContainer = document.getElementById("choices");
    const resultContainer = document.getElementById("result");
    const nextPokemonButton = document.getElementById("next-pokemon");

    let currentPokemon = {};

    const fetchPokemon = async () => {
        const randomId = Math.floor(Math.random() * 151) + 1; 
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        return data;
    };

    const displayPokemon = async () => {
        resultContainer.textContent = "";
        choicesContainer.innerHTML = "";
        currentPokemon = await fetchPokemon();
        pokemonImage.src = currentPokemon.sprites.other["official-artwork"].front_default;
        const choices = [currentPokemon.name];
        pokemonImage.style.filter = "brightness(0%)";
        
        while (choices.length < 4) {
            const choice = await fetchPokemon();
            if (!choices.includes(choice.name)) {
                choices.push(choice.name);
            }
        }
        
        shuffleArray(choices);
        
        choices.forEach(choice => {
            const button = document.createElement("button");
            button.textContent = choice;
            button.addEventListener("click", () => checkAnswer(choice));
            choicesContainer.appendChild(button);
        });

    };

    const checkAnswer = (choice) => {
        if (choice === currentPokemon.name) {
            resultContainer.textContent = "Correct!";
        } else {
            resultContainer.textContent = `Wrong! It's ${currentPokemon.name}.`;
        }
        pokemonImage.style.filter = "none"; // Show Pokemon
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    nextPokemonButton.addEventListener("click", displayPokemon);

    displayPokemon(); // Display the first Pokemon when the page loads
});