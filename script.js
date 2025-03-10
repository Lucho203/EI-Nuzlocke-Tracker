document.addEventListener("DOMContentLoaded", () => {
    const locationSelect = document.getElementById("location");
    const randomizeButton = document.getElementById("randomize");
    const encounterText = document.getElementById("encounter");
    const caughtButton = document.getElementById("caught");
    const failedButton = document.getElementById("failed");
    const logList = document.getElementById("log");

    // Load locations into dropdown
    for (let route in encounterData) {
        let option = document.createElement("option");
        option.value = route;
        option.textContent = route;
        locationSelect.appendChild(option);
    }

    let currentEncounter = "";

    // Randomize encounter
    randomizeButton.addEventListener("click", () => {
        let selectedRoute = locationSelect.value;
        if (!selectedRoute) return;

        let pokemonList = encounterData[selectedRoute];
        if (pokemonList.length === 0) return;

        let randomPokemon = pokemonList[Math.floor(Math.random() * pokemonList.length)];
        currentEncounter = randomPokemon;

        encounterText.textContent = `You encountered a ${randomPokemon}!`;
    });

    // Log encounter as caught or failed
    function logEncounter(status) {
        if (!currentEncounter) return;

        let listItem = document.createElement("li");
        listItem.textContent = `${currentEncounter} - ${status}`;
        logList.appendChild(listItem);

        saveData();
        currentEncounter = "";
        encounterText.textContent = "";
    }

    caughtButton.addEventListener("click", () => logEncounter("Caught"));
    failedButton.addEventListener("click", () => logEncounter("Failed"));

    // Save data to local storage
    function saveData() {
        let logEntries = [];
        document.querySelectorAll("#log li").forEach(item => {
            logEntries.push(item.textContent);
        });
        localStorage.setItem("encounterLog", JSON.stringify(logEntries));
    }

    // Load saved data
    function loadData() {
        let savedLog = JSON.parse(localStorage.getItem("encounterLog")) || [];
        savedLog.forEach(entry => {
            let listItem = document.createElement("li");
            listItem.textContent = entry;
            logList.appendChild(listItem);
        });
    }

    loadData();
});
