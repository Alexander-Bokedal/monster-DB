///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
/////// KOMMENTERA RUNT KODSTYCKEN SÅHÄR  ///////////
////// T.EX "KOD FÖR ATT LÄGGA TILL MONSTER"/////////
//////  SÖKORD: addMonster                //////////
////// "SLUT PÅ KOD FÖR ATT LÄGGA TILL MONSTER" //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

//SÖKORD:
// addMonster
// renderMonsters
// monsterType
// monsterSettings
// filterMonsterList
// editMonster
// Allmänt
// removeMonster
// Optimera
// Globala

// Det här är sökordet om man vill hitta saker att jobba med i koden
// VAD SOM BEHÖVER GÖRAS:
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  GLOBALA VARIABLER                    //////////
/////   SÖKORD: Globala                      //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

let activeFilters = {
  types: [],
  colors: [],
};

const monsters = [
  {
    name: "Henke Penke",
    monsterType: "Strong",
    monsterColor: "White",
    monsterHorns: 17,
    monsterLegs: 2,
    monsterEyes: 4,
    monsterTentacles: 10,
    removeMonster() {
      const index = monsters.indexOf(this);
      if (index > -1) {
        monsters.splice(index, 1);

        applyFilter();
      }
    },
  },
  {
    name: "Boke Dale",
    monsterType: "Weak",
    monsterColor: "Blue",
    monsterHorns: 5,
    monsterLegs: 2,
    monsterEyes: 2,
    monsterTentacles: 7,
    removeMonster() {
      const index = monsters.indexOf(this);
      if (index > -1) {
        monsters.splice(index, 1);

        applyFilter();
      }
    },
  },
  {
    name: "Khani Bani",
    monsterType: "Strong",
    monsterColor: "Red",
    monsterHorns: 3,
    monsterLegs: 2,
    monsterEyes: 1,
    monsterTentacles: 17,
    removeMonster() {
      const index = monsters.indexOf(this);
      if (index > -1) {
        monsters.splice(index, 1);

        applyFilter();
      }
    },
  },
  {
    name: "Denni Penni",
    monsterType: "Anime",
    monsterColor: "Black",
    monsterHorns: 6,
    monsterLegs: 2,
    monsterEyes: 4,
    monsterTentacles: 3,
    removeMonster() {
      const index = monsters.indexOf(this);
      if (index > -1) {
        monsters.splice(index, 1);

        applyFilter();
      }
    },
  },
  {
    name: "Affe Baffe",
    monsterType: "Wow",
    monsterColor: "Yellow",
    monsterHorns: 6,
    monsterLegs: 2,
    monsterEyes: 4,
    monsterTentacles: 3,
    removeMonster() {
      const index = monsters.indexOf(this);
      if (index > -1) {
        monsters.splice(index, 1);

        applyFilter();
      }
    },
  },
];

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ GLOBALA VARIABLER             //////////
/////   SÖKORD: Globala                      //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD FÖR ATT LÄGGA TILL MONSTER       /////////
//////  SÖKORD: addMonster                //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// Lista med förutbestämda monster
// Den här är till för att lättare kunna arbeta med innehållet på hemsidan
// Kommentera ut det här om du vill ha bort listan med monster
onload = () => {
  renderMonsters();
};

const doneButton = document.getElementById("done-button");

// FUNKTION FÖR ATT LÄGGA TILL MONSTER I LISTAN
const addMonsterToArray = () => {
  //SKAPA BEHÅLLARE MED INNEHÅLL FRÅN INPUTFORM!
  // VAD SOM BEHÖVER GÖRAS:
  // Se över denna kod så att den matchar inputform
  // Skapa kod som tillåter det här att redigeras på ett ställe (VG NIVÅ - MÖJLIGTVIS DEN SVÅRASTE PUNKTEN I HELA PROJEKTET (ELLER SÅ ÄR DET JAG SOM ÄR KORKAD))
  /*  const monsterName = document.getElementById("monsterName").value;
  const monsterType = document.getElementById("monsterType").value;
  const monsterHorns = document.getElementById("monsterHorns").value;
  const monsterLegs = document.getElementById("monsterLegs").value;
  const monsterEyes = document.getElementById("monsterEyes").value;
  const monsterTentacles = document.getElementById("monsterTentacles").value; */

  const monsterType = "test";
  const monsterName = "test";
  const monsterColor = "test";
  const monsterHorns = "test";
  const monsterEyes = "test";
  const monsterLegs = "test";
  const monsterTentacles = "test";

  // SKAPA ETT MONSTER SOM ETT OBJEKT
  const newMonster = {
    name: monsterName,
    monsterType: monsterType,
    monsterColor: monsterColor,
    monsterHorns: monsterHorns,
    monsterLegs: monsterLegs,
    monsterEyes: monsterEyes,
    monsterTentacles: monsterTentacles,
    removeMonster() {
      const index = monsters.indexOf(this);
      if (index > -1) {
        monsters.splice(index, 1);

        applyFilter();
      }
    },
  };

  // LÄGG TILL MONSTRET I VÅR ARRAY
  monsters.push(newMonster);
  console.log(monsters);
  // VAD SOM BEHÖVER GÖRAS:
  // EN FUNKTION FÖR ATT RENSA FORMULÄRET

  // FUNKTION FÖR ATT VISA MONSTER I LISTAN
  renderMonsters();
};

// KNAPP FÖR ATT LÄGGA TILL MONSTER I LISTAN
doneButton.addEventListener("click", () => {
  addMonsterToArray();
});

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD FÖR ATT LÄGGA TILL MONSTER/////////
//////  SÖKORD: addMonster                //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD för att visa MONSTER             /////////
//////  SÖKORD: renderMonsters               //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const renderMonsters = (filteredMonsters = monsters) => {
  // VAD SOM BEHÖVER GÖRAS:
  // ANPASSA SÅ ATT KODEN GÅR ATT REDIGERA FRÅN ETT STÄLLE (VG-NIVÅ - MÖJLIGTVIS DEN SVÅRASTE PUNKTEN I PROJEKTET (ELLER SÅ ÄR JAG BARA KORKAD))

  const monsterGallery = document.getElementById("monsterGallery");
  monsterGallery.innerHTML = "";

  const monsterGalleryHtmlArray = filteredMonsters.map((monster) => {
    return `
      <div class="monsterCard">
        <div class="monsterInfo">
          <h2 class="monsterName">${monster.name}</h2>
          <p class="monsterType">Monster Type: ${monster.monsterType}</p>
          <p class="monsterColor">Monster Color: ${monster.monsterColor}</p>
          <p class="monsterHorns">Horns: ${monster.monsterHorns}</p>
          <p class="monsterLegs">Legs: ${monster.monsterLegs}</p>
          <p class="monsterEyes">Eyes: ${monster.monsterEyes}</p>
          <p class="monsterTentacles">Tentacles: ${monster.monsterTentacles}</p>
          <button class="deleteButton"> Delete </button>
        </div>
      </div>
    `;
  });

  monsterGallery.innerHTML = monsterGalleryHtmlArray.join("");
  const deleteButton = document.querySelectorAll(".deleteButton");
  deleteButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      filteredMonsters[index].removeMonster();
    });
  });

  // VAD SOM BEHÖVER GÖRAS:
  // Lägg till editknappar också
};

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD KOD för att visa MONSTER  /////////
//////  SÖKORD: renderMonsters               //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD för att visa MONSTERYPES          /////////
//////  SÖKORD: monsterType                  //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const dietSelect = document.getElementById("monsterDietSelect");
const monsterDietTypes = [
  "🥩Flesh-Muncher",
  "🥬Leaf-Cruncher",
  "🗑️Non-Pesky-Omnivore",
];

const monsterTypeIcons = ["🥩", "🥬", "🗑️"];

for (let i = 0; i < monsterDietTypes.length; i++) {
  let choice = monsterDietTypes[i];

  let dropRows = document.createElement("option");
  dropRows.text = choice;
  dropRows.value = choice;
  dietSelect.appendChild(dropRows);
}

// Optimera
// Slå ihop funktionerna i det här stycket
let typeSelect = document.getElementById("monsterTypeSelect");
let monsterTypes = [
  "🐒Humanoid",
  "🍄Fungal",
  "🪨Titan",
  "🪳Insectiod",
  "🧌Troll",
];

for (let i = 0; i < monsterTypes.length; i++) {
  let choice = monsterTypes[i];

  let dropRow = document.createElement("option");
  dropRow.text = choice;
  dropRow.value = choice;

  typeSelect.appendChild(dropRow);
}

let sizeSelect = document.getElementById("monsterSizeSelect");
let monsterSize = [
  "🤏Pinky-Small",
  "🦒Long-Legs",
  "🐓Average-bin",
  "🌋Crippled-Mountain",
  "🌿Tree-Twig",
];

for (let i = 0; i < monsterSize.length; i++) {
  let choice = monsterSize[i];

  let dropRow = document.createElement("option");
  dropRow.text = choice;
  dropRow.value = choice;

  sizeSelect.appendChild(dropRow);
}

const monsterTypeIcon = document.querySelector(".monsterTypeIcon");
// Optimera om vi har tid
// Fixa så att det inte är en ful if-sats
dietSelect.addEventListener("change", () => {
  monsterTypeIcon.innerHTML = "";

  if (dietSelect.value === "🥩Flesh-Muncher") {
    monsterTypeIcon.innerHTML = "🥩";
  } else if (dietSelect.value === "🥬Leaf-Cruncher") {
    monsterTypeIcon.innerHTML = "🥬";
  } else if (dietSelect.value === "🗑️Non-Pesky-Omnivore") {
    monsterTypeIcon.innerHTML = "🗑️";
  }
});

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD för att visa MONSTERYPES /////////
//////  SÖKORD: monsterType                  //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD för att visa MONSTERSLIDER        /////////
//////  SÖKORD: monsterSliders               //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// Optimera
// Lista ut hur det här fungerar för egen del

function updateSliderValue(sliderId, valueId) {
  let slider = document.getElementById(sliderId);
  let valueDisplay = document.getElementById(valueId);

  valueDisplay.textContent = slider.value;

  slider.addEventListener("input", () => {
    valueDisplay.textContent = slider.value;
  });
}

updateSliderValue("hornsSlider", "hornsValue");
updateSliderValue("legsSlider", "legsValue");
updateSliderValue("eyesSlider", "eyesValue");
updateSliderValue("tentaclesSlider", "tentaclesValue");

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD för att visa MONSTERSLIDER/////////
//////  SÖKORD: monsterSliders               //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD FÖR ATT FILTRERA UTIFRÅN CHECKBOXES /////////
//////  SÖKORD: filterMonsterList          //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// Optimera
// Går det att göra en funktion som skriver ut alla filter istället för att hardkoda?
const applyFilter = () => {
  const filteredMonsters = monsters.filter((monster) => {
    const matchesType =
      activeFilters.types.length === 0 ||
      activeFilters.types.includes(monster.monsterType);

    const matchesColor =
      activeFilters.colors.length === 0 ||
      activeFilters.colors.includes(monster.monsterColor);

    return matchesType && matchesColor;
  });

  renderMonsters(filteredMonsters);
};

const strongFilter = document.querySelector("#strong");
strongFilter.addEventListener("change", () => {
  if (strongFilter.checked) {
    activeFilters.types.push("Strong");
  } else {
    activeFilters.types = activeFilters.types.filter(
      (filter) => filter !== "Strong"
    );
  }
  applyFilter();
});

const animeFilter = document.querySelector("#anime");
animeFilter.addEventListener("change", () => {
  if (animeFilter.checked) {
    activeFilters.types.push("Anime");
  } else {
    activeFilters.types = activeFilters.types.filter(
      (filter) => filter !== "Anime"
    );
  }
  applyFilter();
});

const redFilter = document.querySelector("#red");
redFilter.addEventListener("change", () => {
  if (redFilter.checked) {
    activeFilters.colors.push("Red");
  } else {
    activeFilters.colors = activeFilters.colors.filter(
      (filter) => filter !== "Red"
    );
  }
  applyFilter();
});

// Koden går även att skriva såhär
// Jag lämnar den här i fall vi kommer på att det här är bättre
/* const animeFilter = document.querySelector("#anime");
animeFilter.addEventListener("change", () => {
  if (animeFilter.checked) {
    activeFilter = (monster) => monster.monsterType === "Anime";
    applyFilter();
  } else {
    activeFilter = null;
    applyFilter();
  }
}); */
//VAD SOM BEHÖVER GÖRAS:
// Skapa containers för checkboxes
// Kod som visar hur många av varje typ som finns. T.ex bredvid en checkbox som säger "röd" så ska det visas hur många röda det finns
// Lägg till eventListerners som kollar om checkbox är "checked"
// Skapa en funktion som skriver ut monster beroende på vilken checkbox som har "checked"

// Vi har 5 färger och tre typer
// Det kan bara vara två unika värden för filtrering
// En funktion ska ta in värdena och mapa ut en ny lista beroende på värdena.

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD FÖR ATT FILTRERA UTIFRÅN CHECKBOXES /////////
//////  SÖKORD: filterMonsterList                       //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD FÖR ATT REDIGERA MONSTER         /////////
//////  SÖKORD: editMonster                 //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// VAD SOM BEHÖVER GÖRAS:
// Skapa en eventListener som lyssnar på att man klickar redigera
// Skapa en funktion som hämtar nya värden från det man redigerat
// Uppdatera arrayen med det nya monstret och presentera det

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
////// SLUT PÅ KOD FÖR ATT REDIGERA MONSTER /////////
//////  SÖKORD: editMonster                 //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// Allmänt
// VAD SOM BEHÖVER GÖRAS:
// Fundera på vilken funktionalitet som kan ligga i objekt (för VG-nivå)
// Lista ut om varje monster ska ha en knapp för redigering eller om de ska vara en övergripande funktion
//
