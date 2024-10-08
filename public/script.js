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

const colors = ["red", "black", "blue", "yellow", "green"];

const colorsHtml = colors.map(
  (color) =>
    `<button class="color-box" style="background-color: ${color};"></button>`
);

let colorSelection = null;

const editableValues = ["Tentacles", "Horns", "Eyes", "Legs"];

const editableObjects = editableValues.map((value, index) => ({
  name: value,
  html: `<div class="slider">
    <label for="${value}">${value}</label>
    <br />
    <input type="range" id="slider${index + 1}" min="0" max="6" />
    <span id="value${index + 1}"></span>
  </div>`,
}));

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ GLOBALA VARIABLER             //////////
/////   SÖKORD: Globala                      //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  FUNKTIONER ON LOAD                    //////////
/////   SÖKORD: onLoad                       //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const monsterSliders = document.querySelector("#sliders");

const updateMonsterSliders = () => {
  monsterSliders.innerHTML = editableObjects.map((obj) => obj.html).join("");
};

const colorsToChooseFrom = document.querySelector("#colors-main");
const updateColors = () => {
  colorsToChooseFrom.innerHTML = colorsHtml.join("");
  const colorDivs = document.querySelectorAll(".color-box");

  colorDivs.forEach((div) => {
    div.addEventListener("click", () => {
      colorSelection = div.style.backgroundColor;
      console.log(colorSelection);
    });
  });
};

// Lista med förutbestämda monster
// Den här är till för att lättare kunna arbeta med innehållet på hemsidan
// Kommentera ut det här om du vill ha bort listan med monster
window.onload = () => {
  renderMonsters();
  updateMonsterSliders();
  updateColors();
  updateSliderValue("slider1", "value1");
  updateSliderValue("slider2", "value2");
  updateSliderValue("slider3", "value3");
  updateSliderValue("slider4", "value4");
};

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ FUNKTIONER ON LOAD           //////////
/////   SÖKORD: onLoad                       //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD FÖR ATT LÄGGA TILL MONSTER       /////////
//////  SÖKORD: addMonster                //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const doneButton = document.getElementById("done-button");

// FUNKTION FÖR ATT LÄGGA TILL MONSTER I LISTAN
const addMonsterToArray = () => {
  //SKAPA BEHÅLLARE MED INNEHÅLL FRÅN INPUTFORM!
  // VAD SOM BEHÖVER GÖRAS:
  // Se över denna kod så att den matchar inputform
  // Skapa kod som tillåter det här att redigeras på ett ställe (VG NIVÅ - MÖJLIGTVIS DEN SVÅRASTE PUNKTEN I HELA PROJEKTET (ELLER SÅ ÄR DET JAG SOM ÄR KORKAD))
  /*   const monsterName = document.getElementById("monsterName").value; */

  // 9/10 - Nya värden som funkar bra vvvvvvvv
  const newmonsterDiet = monsterDiet.value;
  const newmonsterType = monsterType.value;
  const newmonsterSize = monsterSize.value;
  const sliderNumberOne = document.querySelector("#slider1").value;
  const sliderNumberTwo = document.querySelector("#slider2").value;
  const sliderNumberThree = document.querySelector("#slider3").value;
  const sliderNumberFour = document.querySelector("#slider4").value;

  // SKAPA ETT MONSTER SOM ETT OBJEKT
  const newMonster = {
    /*     name: monsterName, */
    monsterType: newmonsterType,
    monsterColor: colorSelection,
    monsterDiet: newmonsterDiet,
    monsterSize: newmonsterSize,
    monsterValueOne: sliderNumberOne,
    monsterValueTwo: sliderNumberTwo,
    monsterValueThree: sliderNumberThree,
    monsterValueFour: sliderNumberFour,
    removeMonster() {
      const index = monsters.indexOf(this);
      if (index > -1) {
        monsters.splice(index, 1);

        // Apply filter innehåller funktionen renderMonsters()
        // Om det finns aktiva filter, så kommer applyFilter() ge en lista utifrån filtrerna
        // Annars ger den en lista utifrån arryen monsters
        // Apply filter ligger här för att man ska kunna ta bort monster från en filtrerad och sen få en uppdaterad lista som fortfarande är filtrerad
        applyFilter();
      }
    },
  };

  // LÄGG TILL MONSTRET I VÅR ARRAY
  monsters.push(newMonster);
  console.log(newMonster);
  // VAD SOM BEHÖVER GÖRAS:
  // EN FUNKTION FÖR ATT RENSA FORMULÄRET

  // FUNKTION FÖR ATT VISA MONSTER I LISTAN
  renderMonsters();

  // Städa upp form
  colorSelection = null;
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

  const monsterGallery = document.getElementById("monster-gallery-container");
  monsterGallery.innerHTML = "";

  const monsterGalleryHtmlArray = filteredMonsters.map((monster) => {
    return `
      <div class="monsterCard">
        <div class="monsterInfo">
          <h2 class="monsterName">${monster.name}</h2>
          <p class="monsterType">Monster Type: ${monster.monsterType}</p>
          <p class="monsterColor">Monster Color: ${monster.monsterColor}</p>
          <p class="editableValueOne">${editableValues[0]}: ${monster.monsterValueOne}</p>
          <p class="editableValueTwo">${editableValues[1]}: ${monster.monsterValueTwo}</p>
          <p class="editableValueThree">${editableValues[2]}: ${monster.monsterValueThree}</p>
          <p class="editableValueFour">${editableValues[3]}: ${monster.monsterValueFour}</p>
          <button class="deleteButton"> Delete </button>
          <button class="editButton"> Edit </button>
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

// 9/10 - Ändrat om här, vet inte om vi vill ha det såhär  vvvvvvvvvvvvvvv
const monsterDiet = document.querySelector("#monsterDietSelect");
const monsterDietFilter = document.querySelector("#monsterDietSelectFilter");
const monsterType = document.querySelector("#monsterTypeSelect");
const mosterTypeFilter = document.querySelector("#monsterTypeSelectFilter");

const monsterSize = document.querySelector("#monsterSizeSelect");
const monsterSizeFilter = document.querySelector("#monsterSizeSelectFilter");
const monsterDiets = [
  "🥩Flesh-Muncher",
  "🥬Leaf-Cruncher",
  "🗑️Non-Pesky-Omnivore",
];

const monsterTypes = [
  "🐒Humanoid",
  "🍄Fungal",
  "🪨Titan",
  "🪳Insectiod",
  "🧌Troll",
];

const monsterSizes = [
  "🤏Pinky-Small",
  "🦒Long-Legs",
  "🐓Average-bin",
  "🌋Crippled-Mountain",
  "🌿Tree-Twig",
];

const monsterTypeIcons = ["🥩", "🥬", "🗑️"];

/* New updated "for of" loop instead of normal "for" loops. Looks cleaner*/
function dietDropdown(dietSelect) {
  for (const diet of monsterDiets) {
    const newMonsterDiet = document.createElement("option");
    newMonsterDiet.innerHTML = diet;
    newMonsterDiet.value = diet;
    dietSelect.appendChild(newMonsterDiet);
  }
}

function typeDropdown(typeSelect) {
  for (const type of monsterTypes) {
    const newMonsterType = document.createElement("option");
    newMonsterType.innerHTML = type;
    newMonsterType.value = type;
    typeSelect.appendChild(newMonsterType);
  }
}

function sizeDropdown(sizeSelect) {
  for (const size of monsterSizes) {
    const newMonsterSize = document.createElement("option");
    newMonsterSize.text = size;
    newMonsterSize.value = size;
    sizeSelect.appendChild(newMonsterSize);
  }
}

dietDropdown(monsterDiet);
dietDropdown(monsterDietFilter);
typeDropdown(monsterType);
typeDropdown(mosterTypeFilter);
sizeDropdown(monsterSize);
sizeDropdown(monsterSizeFilter);

//Ändrat om tills hit ^^^^^^^^^^^^

const monsterTypeIcon = document.querySelector(".monsterTypeIcon");
// Optimera om vi har tid

// Fixa så att det inte är en ful if-sats
monsterDiet.addEventListener("change", () => {
  monsterTypeIcon.innerHTML = "";

  if (monsterDiet.value === "🥩Flesh-Muncher") {
    monsterTypeIcon.innerHTML = "🥩";
  } else if (monsterDiet.value === "🥬Leaf-Cruncher") {
    monsterTypeIcon.innerHTML = "🥬";
  } else if (monsterDiet.value === "🗑️Non-Pesky-Omnivore") {
    monsterTypeIcon.innerHTML = "🗑️";
  }
});

monsterType.addEventListener("change", () => {
  monsterTypeIcon.innerHTML = "";

  if (monsterType.value === "🐒Humanoid") {
    monsterTypeIcon.innerHTML = "🐒";
  } else if (monsterType.value === "🍄Fungal") {
    monsterTypeIcon.innerHTML = "🍄";
  } else if (monsterType.value === "🪨Titan") {
    monsterTypeIcon.innerHTML = "🪨";
  } else if ((monsterType.value = "🪳Insectiod")) {
    monsterTypeIcon.innerHTML = "🪳";
  } else if ((monsterType.value = "🧌Troll")) {
    monsterTypeIcon.innerHTML = "🧌";
  }
});

const monsterSizeIcon = document.querySelector(".monsterSizeIcon");
monsterSize.addEventListener("change", () => {
  monsterSizeIcon.innerHTML = "";

  if (monsterSize.value === "🤏Pinky-Small") {
    monsterSizeIcon.innerHTML = "🤏";
  } else if (monsterSize.value === "🦒Long-Legs") {
    monsterSizeIcon.innerHTML = "🦒";
  } else if (monsterSize.value === "🐓Average-Bin") {
    monsterSizeIcon.innerHTML = "🐓";
  } else if (monsterSize.value === "🌋Crippled-Mountain") {
    monsterSizeIcon.innerHTML = "🌋";
  } else if (monsterSize.value === "🌿Tree-Twig") {
    monsterSizeIcon.innerHTML = "🌿";
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

// Applyfilter kollar om det finns aktiva filter och returnerar monster utifrån de filtrerna
// Finns det inga aktiva filter kommer alla monster att returneras och därför mapas ut med renderMonsters()
// Koden är gjord för att man ska kunna filtrera på flera sätt åt gången, dvs typ och färg
const applyFilter = () => {
  const filteredMonsters = monsters.filter((monster) => {
    const matchesType =
      // Om "types" är lika med 0 så finns det inga filter, och det här villkoret blir sant
      // Om "types" har filter i sig returneras monstret bara om dess monsterType matchar det som finns i flitret.
      activeFilters.types.length === 0 ||
      activeFilters.types.includes(monster.monsterType);

    // Om "colors" är lika med 0 så finns det inga filter, och det här villkoret blir sant
    // Om "color" har filter i sig returneras monstret bara om dess monsterType matchar det som finns i flitret.
    const matchesColor =
      activeFilters.colors.length === 0 ||
      activeFilters.colors.includes(monster.monsterColor);

    // Monstret returneras bara om både matchesType och matchesColor är lika med true.
    // I ett fall där det inte finns några filter kommer båda villkoren alltid vara sanna och därför returnera all monster

    return matchesType && matchesColor;
  });

  renderMonsters(filteredMonsters);
};

// Optimera
// Går det att göra en funktion som skriver ut alla filter istället för att hardkoda?

// Skapar en behåller för id strong, som är en checkbox i vår html
const strongFilter = document.querySelector("#strong");

// Lyssnar på om status på checkbox ändras
// Om strongFilter === checked efter change så lägger vi till ett filter i vår filter array
// Om den inte är checked efter change tar vi istället bort filtret från vår array
// Sen körs applyFilter, vilket renderar ut monster utifrån filter OM det finns filter
// Annars körs renderMonsters(), som ligger inuti funktionen applyFilter.
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

//VAD SOM BEHÖVER GÖRAS:
// Skriva ut info om hur många av varje typ det finns bredvid checkboxes

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
