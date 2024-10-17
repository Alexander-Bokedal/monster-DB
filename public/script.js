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

// Globala arryer för att kunna applicera multipla filter
let activeFilters = {
  types: "",
  colors: [],
};

// Array med färger som går att ändra till valfria färger
// "name:" är det som kommer skrivas ut, "color:" är den faktiska färgen
// exempel "name: "White", color: "#fff""
const colors = [
  { name: "Red", color: "red" },
  { name: "Black", color: "black" },
  { name: "Blue", color: "blue" },
  { name: "Yellow", color: "yellow" },
  { name: "Green", color: "green" },
];

const colorsHtml = colors.map(
  (color) =>
    `<div class="color-container">
  <button class="color-box" 
  id="${color.name}-button" 
  style="background-color: ${color.color};"></button>
  <p>${color.name}</p>
  </div>`
);

const colorsNames = colors.map((color) => color.name);

let colorSelection = null;

// Kod för att formatera namn
const formatText = (string) => {
  let formattedText = "";
  // Skap tom "" variabel för den omgjorda strängen
  const splitArray = string.split(" ");
  // Funktionen split(" ") används för att dela upp den ursprungliga strängen i en array av ord
  for (const element of splitArray) {
    // Loop itererar över varje element (ord) i arrayen
    formattedText += element.charAt(0).toUpperCase() + element.slice(1) + " ";
    // För varje element (ord) i arrayen blir index 0 stor bokstav, fr o m index [1] splice
  }
  return formattedText;
  // Returnera
};

// Lista med förutbestämda monster
// Den här är till för att lättare kunna arbeta med innehållet på hemsidan
// Kommentera ut det här om du vill ha bort listan med monster

const editableSliderNames = ["Tentacles", "Horns", "Eyes", "Legs"];
// Gör en array av val som vi kan ändra med sliders.
const editableSliders = editableSliderNames.map((value, index) => ({
  // Gör en arrowfunction med .map funktion på varje element i editableSliderNames
  name: value,
  // Tilldela egenskapen "name" med värdet av variabeln "value"
  html: `<div class="slider"> 
    <!--Starta HTML-strukturen för slidern-->

    <label for="${value}">${value}</label> 
    <!--Skapa en etikett för slidern kopplad till "value"-->

    <br/>
    <input type="range" id="slider${index}" min="0" max="6" /> 
    <!--Skapa en slider med ett unikt ID baserat på "index" och sätt min- och max-värden-->

    <span id="value${index}"></span> 
    <!--Skapa ett span-element för att visa sliderns aktuella värde, med unikt ID-->

  </div>`,
  // Avsluta HTML-strukturen för slidern

  updateSliderValue() {
    // Definiera en metod för att uppdatera sliderns värde

    let slider = document.querySelector(`#slider${index}`);
    // Hämta input-elementet för slidern med ID baserat på "index"

    let valueDisplay = document.querySelector(`#value${index}`);
    // Hämta span-elementet med ID baserat på "index" för att visa värdet

    valueDisplay.textContent = slider.value;
    // Sätt textinnehållet i span-elementet till det nuvarande värdet av slidern

    slider.addEventListener("input", (event) => {
      // Lägg till en eventlyssnare för "input"-händelsen på slidern

      valueDisplay.textContent = event.target.value;
      // Uppdatera textinnehållet i span-elementet med det aktuella värdet av slidern
    });
  },
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
// Hämta HTML-elementet med ID "sliders" och tilldela det till variabeln "monsterSliders"

const updateMonsterSliders = () => {
  // Definiera en funktion för att uppdatera monster-sliders
  monsterSliders.innerHTML = editableSliders.map((obj) => obj.html).join("");
  // Generera HTML från varje objekt i "editableSliders" och sätt den som inre HTML av "monsterSliders"
};

const initalizeSliders = () => {
  // Definiera en funktion för att initiera sliders
  editableSliders.forEach((slider) => {
    // Loopar igenom varje "slider" i "editableSliders"
    slider.updateSliderValue();
    // Anropa metoden "updateSliderValue" för att sätta upp eventlyssnare och visa initialvärdet för varje slider
  });
};

const colorsToChooseFrom = document.querySelector("#colors-container");
// Hämta HTML-elementet med ID "colors-container" och tilldela det till variabeln "colorsToChooseFrom"

const updateColors = () => {
  // Definiera en funktion för att uppdatera färger
  colorsToChooseFrom.innerHTML = colorsHtml.join("");
  // Sätt den inre HTML av "colorsToChooseFrom" till sammanfogad HTML-sträng från "colorsHtml"
  const colorDivs = document.querySelectorAll(".color-box");
  // Hämta alla HTML-element med klassen "color-box" och tilldela dem till variabeln "colorDivs"

  colorDivs.forEach((button) => {
    // Loopar igenom varje "button" i "colorDivs"
    button.addEventListener("click", (event) => {
      // Lägg till en eventlyssnare för "click"-händelsen på varje "button"
      event.preventDefault();
      // Förhindra standardbeteendet för händelsen
      colorSelection = button.style.backgroundColor;
      // Tilldela variabeln "colorSelection" den bakgrundsfärg som är inställd för knappen som klickades

      document.querySelector(
        // Hämta elementet med klassen "show-color-selection"

        ".show-color-selection"
      ).innerHTML = `<div class="show-color-selection" style="background-color: ${colorSelection}"></div>`;
      // Uppdatera den inre HTML av "show-color-selection" för att visa den valda färgen
      console.log(colorSelection);
      // Skriv ut den valda färgen i konsolen
    });
  });
};

// Alla funktioner som behöver köras när man laddar sidan första gången
window.onload = () => {
  renderMonsters();
  updateColorFilters();
  updateMonsterSliders();
  updateColors();
  initalizeSliders();
};

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ FUNKTIONER ON LOAD           //////////
/////   SÖKORD: onLoad                       //////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD FÖR ATT LÄGGA TILL MONSTER       /////////
//////  SÖKORD: addMonster                   ////
///////////////////////////////////////////////////////

const doneButton = document.getElementById("done-button");
// Hämta HTML-elementet med ID "done-button" och tilldela det till variabeln "doneButton"

const testButton = document.getElementById("test-button");
// Hämta HTML-elementet med ID "test-button" och tilldela det till variabeln "testButton"

const monsterNameInputField = document.getElementById("monster-name");
// Hämta HTML-elementet med ID "monster-name" och tilldela det till variabeln "monsterNameInputField"

const checkNameLength = document.querySelector(".check-name-length");
// Hämta det första HTML-elementet med klassen "check-name-length" och tilldela det till variabeln "checkNameLength"

testButton.addEventListener("click", (e) => {
  // Lägg till en eventlyssnare för "click"-händelsen på "testButton"
  e.preventDefault(); // Förhindra standardbeteendet för händelsen (t.ex. att formuläret skickas)

  // Lägg till ett nytt monsterobjekt i "monsters" arrayen
  monsters.push({
    name: "Test Monster", // Sätt namnet på monstret till "Test Monster"
    monsterDiet: monsterDiets[Math.floor(Math.random() * monsterDiets.length)],
    // Välj en slumpmässig diet från "monsterDiets" arrayen
    monsterType: monsterTypes[Math.floor(Math.random() * monsterTypes.length)],
    // Välj en slumpmässig typ från "monsterTypes" arrayen
    monsterSize: monsterSizes[Math.floor(Math.random() * monsterSizes.length)],
    // Välj en slumpmässig storlek från "monsterSizes" arrayen

    monsterColor: formatText(
      // Formatera och sätt färgen på monstret
      colors[Math.floor(Math.random() * colors.length)].color
      // Välj en slumpmässig färg från "colors" arrayen och formatera den
    ),

    monsterValues: [
      // Sätt värden för monstret i en array
      Math.floor(Math.random() * 7), // Slumptal mellan 0 och 5
      Math.floor(Math.random() * 7), // Slumptal mellan 0 och 5
      Math.floor(Math.random() * 7), // Slumptal mellan 0 och 5
      Math.floor(Math.random() * 7), // Slumptal mellan 0 och 5
    ],
    removeMonster() {
      // Definiera en metod för att ta bort monstret från "monsters" arrayen
      const index = monsters.indexOf(this);
      // Hämta indexet för det aktuella monstret
      if (index > -1) {
        // Kontrollera om monstret finns i arrayen
        monsters.splice(index, 1);
        // Ta bort monstret från arrayen

        applyFilter();
        // Anropa "applyFilter" för att uppdatera visningen av monster
      }
    },
  });

  console.log(monsters[0]);

  // Skriv ut hela "monsters" arrayen i konsolen
  applyFilter();
  // Anropa "applyFilter" för att uppdatera visningen av monster
});

monsterNameInputField.addEventListener("input", () => {
  // Lägg till en eventlyssnare för "input"-händelsen på "monsterNameInputField"
  if (monsterNameInputField.value.length > 28) {
    // Kontrollera om längden på värdet i inputfältet är längre än 28 tecken
    checkNameLength.innerHTML = "";
    // Rensa tidigare meddelande
    checkNameLength.innerHTML = `<p style="color:red">Name is too long!</p>`;
    // Visa ett meddelande i röd text som informerar att namnet är för långt
    doneButton.disabled = true;
    // Inaktivera "doneButton" så att det inte kan klickas
  } else {
    // Om längden på namnet är 28 tecken eller kortare
    checkNameLength.innerHTML = "";
    // Rensa meddelandet
    doneButton.disabled = false;
    // Aktivera "doneButton" så att det kan klickas
  }
});

// FUNKTION FÖR ATT LÄGGA TILL MONSTER I LISTAN
const addMonsterToArray = (event) => {
  // Definiera en funktion som tar ett event som parameter
  event.preventDefault();
  // Förhindra standardbeteendet för eventet (t.ex. formulärskick)

  // SKAPA BEHÅLLARE MED INNEHÅLL FRÅN INPUTFORM!
  // VAD SOM BEHÖVER GÖRAS:

  // 9/10 - Nya värden som funkar bra
  const monsterName = monsterNameInputField.value;
  // Hämta värdet från monsterName inputfältet
  const newMonsterDiet = monsterDiet.value;
  // Hämta valt värde från dietinputfältet
  const newMonsterType = monsterType.value;
  // Hämta valt värde från typinputfältet
  const newMonsterSize = monsterSize.value;
  // Hämta valt värde från storleksinputfältet
  const sliderValuesToAddToMonsterObject = [];
  // Skapa en tom array för att lagra slidervärden
  const arrayOfAllSliders = document.querySelectorAll(".slider");
  // Hämta alla HTML-element med klassen "slider"

  // Loopar igenom alla sliders för att hämta deras värden
  for (let i = 0; i < arrayOfAllSliders.length; i++) {
    // Loopa genom arrayen av sliders
    sliderValuesToAddToMonsterObject.push(
      // Lägg till slidervärdet i arrayen
      document.querySelector(`#slider${i}`).value
      // Hämta värdet från varje slider baserat på dess ID
    );
  }

  // Kod för att förhindra submit om fälten är tomma
  const checkIfFormFilled = document.querySelector(".check-if-form-filled");
  // Hämta elementet för att visa felmeddelanden

  // Kontrollera om monsterNamnet är tomt
  if (monsterName === "") {
    // Om namnet är tomt
    checkIfFormFilled.innerHTML = `<p style="color:red">Please enter a name! </p>`;
    // Visa ett felmeddelande i röd text
    return;
    // Avbryt funktionen
  } else if (newMonsterDiet === "") {
    // Om dieten är tom
    checkIfFormFilled.innerHTML = `<p style="color:red">Please select a diet! </p>`;
    // Visa ett felmeddelande
    return;
    // Avbryt funktionen
  } else if (newMonsterType === "") {
    // Om typen är tom
    checkIfFormFilled.innerHTML = `<p style="color:red">Please select a type! </p>`;
    // Visa ett felmeddelande
    return;
    // Avbryt funktionen
  } else if (newMonsterSize === "") {
    // Om storleken är tom
    checkIfFormFilled.innerHTML = `<p style="color:red">Please select a size! </p>`;
    // Visa ett felmeddelande
    return;
    // Avbryt funktionen
  } else if (colorSelection === null) {
    // Om ingen färg har valts
    checkIfFormFilled.innerHTML = `<p style="color:red">Please select a color! </p>`;
    // Visa ett felmeddelande
    return;
    // Avbryt funktionen
  }

  // SKAPA ETT MONSTER SOM ETT OBJEKT
  const newMonster = {
    // Definiera ett nytt monsterobjekt
    name: formatText(monsterName),
    // Sätt namnet på monstret till det formaterade namnet från inputfältet
    monsterType: newMonsterType,
    // Sätt typ av monster till värdet från inputfältet
    monsterColor: formatText(colorSelection),
    // Sätt färg på monstret till den formaterade färgen som valts
    monsterDiet: newMonsterDiet,
    // Sätt diet på monstret till det valda dietvärdet
    monsterSize: newMonsterSize,
    // Sätt storlek på monstret till det valda storleksvärdet
    monsterValues: sliderValuesToAddToMonsterObject,
    // Sätt värdena för monstret till arrayen med slidervärden
    removeMonster() {
      // Definiera en metod för att ta bort monstret från listan
      const index = monsters.indexOf(this);
      // Hämta indexet för det aktuella monstret
      if (index > -1) {
        // Kontrollera om monstret finns i arrayen
        monsters.splice(index, 1);
        // Ta bort monstret från arrayen med hjälp av dess index
        applyFilter();
        // Anropa "applyFilter" för att uppdatera visningen av monster
      }
    },
  };

  monsters.push(newMonster);
  console.log(newMonster);
  // VAD SOM BEHÖVER GÖRAS:
  // EN FUNKTION FÖR ATT RENSA FORMULÄRET

  // FUNKTION FÖR ATT VISA MONSTER I LISTAN
  applyFilter();

  // Städa upp form
  document.querySelector("#monsterSettings").reset();
  colorSelection = null;
  document.querySelector(".show-color-selection").innerHTML = "";
  initalizeSliders();
  checkIfFormFilled.innerHTML = "";
};

// KNAPP FÖR ATT LÄGGA TILL MONSTER I LISTAN
doneButton.addEventListener("click", (event) => {
  addMonsterToArray(event);
});

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD FÖR ATT LÄGGA TILL MONSTER/////////
//////  SÖKORD: addMonster                //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const storeCheckboxState = () => {
  const state = {};
  const colorFilterDivs = document.querySelectorAll(".color-to-filter-by");

  colorFilterDivs.forEach((checkbox) => {
    state[checkbox.id] = checkbox.checked;
  });

  return state;
};

const restoreCheckboxState = (state) => {
  const colorFilterDivs = document.querySelectorAll(".color-to-filter-by");

  colorFilterDivs.forEach((checkbox) => {
    if (state.hasOwnProperty(checkbox.id)) {
      checkbox.checked = state[checkbox.id];
    }
  });
};

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD för att visa MONSTER             /////////
//////  SÖKORD: renderMonsters               //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const renderMonsters = (filteredMonsters = monsters) => {
  const monsterGallery = document.getElementById("monster-gallery-container");
  monsterGallery.innerHTML = "";

  // Store the current checkbox state before updating the filters
  const checkboxState = storeCheckboxState();

  const monsterGalleryHtmlArray = filteredMonsters.map((monster) => {
    const objectsWithValuesToPresentInHtml = [];
    let count = 0;

    for (const element of editableSliderNames) {
      let monsterAttribute = element;
      let attributeValue = monster.monsterValues[count];
      count++;
      objectsWithValuesToPresentInHtml.push({
        attribute: monsterAttribute,
        value: attributeValue,
      });
    }

    const valuesToPresentInHtml = objectsWithValuesToPresentInHtml
      .map((obj) => {
        return `<p class="editable-value">${obj.attribute}: ${obj.value}</p>`;
      })
      .join("");

    return `
      <div class="monsterCard" tabindex="0">
        <div class="monsterInfo" tabindex="0">
          <h2 class="monsterName">${monster.name}</h2>
          <p class="monsterColor">Color: ${monster.monsterColor}</p>
          <p class="monsterDiet">Diet: ${monster.monsterDiet}</p>
          <p class="monsterDiet">Type: ${monster.monsterType}</p>
          <p class="monsterColor">Size: ${monster.monsterSize}</p>
          ${valuesToPresentInHtml}
        </div>
        <div class="monster-info-btns">
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

  const editButton = document.querySelectorAll(".editButton");
  editButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      const monsterMainName = document.querySelector(".monsterNameMain");
      console.log(monsters[index]);
      monsterMainName.textContent = monsters[index].name;
      console.log(monsterMainName);
      monsterNameInputField.textContent = monsters[index].name;
      console.log(monsterNameInputField);
      let monsterSliderValue = (monsterSliders.value =
        monsters[index].monsterValues);
      console.log(monsterSliders);
      console.log(monsterSliderValue);
    });
  });

  // 15/10 Funktion för att räkna och visa antal monster
  function updateMonsterCount() {
    const monsterCounter = document.querySelector("#monster-counter");
    monsterCounter.textContent = `Total Monsters: ${monsters.length}`;
  }

  function dietCounter() {
    const fleshCounter = document.querySelector("#flesh-counter");
    const leafCounter = document.querySelector("#leaf-counter");
    const omnivoreCounter = document.querySelector("#omnivore-counter");
    // Get the right HTML elements
    const fleshMuncherCount = monsters.filter(
      (monster) => monster.monsterDiet === "🥩Flesh-Muncher"
    ).length;
    const leafCruncherCount = monsters.filter(
      (monster) => monster.monsterDiet === "🥬Leaf-Cruncher"
    ).length;
    const NonPeskyCount = monsters.filter(
      (monster) => monster.monsterDiet === "🗑️Non-Pesky-Omnivore"
    ).length;
    // Fetch diet from the objects "monster.monsterDiet"
    fleshCounter.textContent = `🥩: ${fleshMuncherCount}`;
    leafCounter.textContent = `🥬: ${leafCruncherCount}`;
    omnivoreCounter.textContent = `🗑️: ${NonPeskyCount}`;
    // Apply right icons to the HTML div
  }

  // Update the filters and restore the checkbox state
  updateColorFilters();
  updateMonsterCount();
  restoreCheckboxState(checkboxState);
  dietCounter();
};

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD för att visa MONSTER      /////////
//////  SÖKORD: renderMonsters               //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD för att visa MONSTERYPES          /////////
//////  SÖKORD: monsterType                  //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const clearFilterButton = document.querySelector("#clear-filter-button");
// Hämta knappen för att rensa filter med dess ID.
clearFilterButton.addEventListener("click", (e) => {
  // Lägg till en klick-händelse för knappen.
  e.preventDefault();
  // Förhindra standardbeteendet för knappen, t.ex. att skicka ett formulär.

  monsterDietFilter.value = "";
  // Återställ värdet för dietfilter till en tom sträng.

  const colorFilterDivs = document.querySelectorAll(".color-to-filter-by");
  // Hämta alla checkboxar för att filtrera färger.
  colorFilterDivs.forEach((checkbox) => {
    // Loopar genom varje checkbox.
    checkbox.checked = false;
    // Avmarkera varje checkbox.
  });

  activeFilters.colors = [];
  // Rensa arrayen för aktiva färgfilter.
  activeFilters.types = "";
  // Återställ typen av aktiva filter till en tom sträng.

  applyFilter();
  // Anropa funktionen för att tillämpa filter och uppdatera visningen av monster.
});

const monsterDiet = document.querySelector("#monsterDietSelect");
// Hämta elementet med ID "monsterDietSelect", som är en dropdown för att välja monsterdiet.
const monsterDietFilter = document.querySelector("#monsterDietSelectFilter");
// Hämta elementet med ID "monsterDietSelectFilter", som är en dropdown för att filtrera monster efter diet.
const monsterType = document.querySelector("#monsterTypeSelect");
// Hämta elementet med ID "monsterTypeSelect", som är en dropdown för att välja monstertyp.
const monsterTypeFilter = document.querySelector("#monsterTypeSelectFilter");
// Hämta elementet med ID "monsterTypeSelectFilter", som är en dropdown för att filtrera monster efter typ.
const monsterSize = document.querySelector("#monsterSizeSelect");
// Hämta elementet med ID "monsterSizeSelect", som är en dropdown för att välja monstersize.
const monsterSizeFilter = document.querySelector("#monsterSizeSelectFilter");
// Hämta elementet med ID "monsterSizeSelectFilter", som är en dropdown för att filtrera monster efter storlek.

const monsterDiets = [
  // Skapa en array som innehåller olika typer av monsterdieter.

  "🥩Flesh-Muncher", // Diet för köttätande monster.
  "🥬Leaf-Cruncher", // Diet för växtätande monster.
  "🗑️Non-Pesky-Omnivore", // Diet för allätande monster som inte är så kräsna.
];

const monsterTypes = [
  // Skapa en array som innehåller olika typer av monster.

  "🐒Humanoid", // Typ för humanoida monster.
  "🍄Fungal", // Typ för svampmonster.
  "🪨Titan", // Typ för titanmonster.
  "🪳Insectiod", // Typ för insektsmonster.
  "🧌Troll", // Typ för trollmonster.
];

const monsterSizes = [
  // Skapa en array som innehåller olika storlekar av monster.

  "🤏Pinky-Small", // Storlek för mycket små monster.
  "🦒Long-Legs", // Storlek för monster med långa ben.
  "🐓Average-bin", // Genomsnittlig storlek för monster.
  "🌋Crippled-Mountain", // Storlek för stora monster som liknar berg.
  "🌿Tree-Twig", // Storlek för monster som liknar träd.
];

function dietDropdown(dietSelect) {
  // Definiera en funktion som tar en parameter dietSelect (en dropdown för dieter).
  for (const diet of monsterDiets) {
    // Loopar igenom varje diet i monsterDiets-arrayen.
    const newMonsterDiet = document.createElement("option");
    // Skapa ett nytt option-element för dropdown.
    newMonsterDiet.innerHTML = diet;
    // Sätt innhåll i option-elementet till aktuell diet.
    newMonsterDiet.value = diet;
    // Sätt värdet för option-elementet till aktuell diet.
    dietSelect.appendChild(newMonsterDiet);
    // Lägg till det nya option-elementet i dietSelect dropdown-menyn.
  }
}

function typeDropdown(typeSelect) {
  // Definiera en funktion som tar en parameter typeSelect (en dropdown för typer).
  for (const type of monsterTypes) {
    // Loopar igenom varje typ i monsterTypes-arrayen.
    const newMonsterType = document.createElement("option");
    // Skapa ett nytt option-element för dropdown.
    newMonsterType.innerHTML = type;
    // Sätt innhåll i option-elementet till aktuell typ.
    newMonsterType.value = type;
    // Sätt värdet för option-elementet till aktuell typ.
    typeSelect.appendChild(newMonsterType);
    // Lägg till det nya option-elementet i typeSelect dropdown-menyn.
  }
}

function sizeDropdown(sizeSelect) {
  // Definiera en funktion som tar en parameter sizeSelect (en dropdown för storlekar).
  for (const size of monsterSizes) {
    // Loopar igenom varje storlek i monsterSizes-arrayen.
    const newMonsterSize = document.createElement("option");
    // Skapa ett nytt option-element för dropdown.
    newMonsterSize.text = size;
    // Sätt textinnehåll i option-elementet till aktuell storlek.
    newMonsterSize.value = size;
    // Sätt värdet för option-elementet till aktuell storlek.
    sizeSelect.appendChild(newMonsterSize);
    // Lägg till det nya option-elementet i sizeSelect dropdown-menyn.
  }
}

dietDropdown(monsterDiet);
dietDropdown(monsterDietFilter);
typeDropdown(monsterType);
sizeDropdown(monsterSize);

const monsterDietIcon = document.querySelector(".monsterDietIcon");
// Optimera om vi har tid

// Fixa så att det inte är en ful if-sats
monsterDiet.addEventListener("change", () => {
  monsterDietIcon.innerHTML = "";

  if (monsterDiet.value === "🥩Flesh-Muncher") {
    monsterDietIcon.innerHTML = "🥩";
  } else if (monsterDiet.value === "🥬Leaf-Cruncher") {
    monsterDietIcon.innerHTML = "🥬";
  } else if (monsterDiet.value === "🗑️Non-Pesky-Omnivore") {
    monsterDietIcon.innerHTML = "🗑️";
  }
});
const monsterTypeIcon = document.querySelector(".monsterTypeIcon");
monsterType.addEventListener("change", () => {
  monsterTypeIcon.innerHTML = "";
  if (monsterType.value === "🐒Humanoid") {
    monsterTypeIcon.innerHTML = "🐒";
  } else if (monsterType.value === "🍄Fungal") {
    monsterTypeIcon.innerHTML = "🍄";
  } else if (monsterType.value === "💪Titan") {
    monsterTypeIcon.innerHTML = "💪";
  } else if ((monsterType.value = "🕷Insectiod")) {
    monsterTypeIcon.innerHTML = "🕷";
  } else if ((monsterType.value = "🧞‍♂️Troll")) {
    monsterTypeIcon.innerHTML = "🧞‍♂️";
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
      // Om "types" har filter i sig returneras monstret bara om dess monsterDiet matchar det som finns i flitret.
      activeFilters.types === "" || activeFilters.types === monster.monsterDiet;

    // Om "colors" är lika med 0 så finns det inga filter, och det här villkoret blir sant
    // Om "color" har filter i sig returneras monstret bara om dess monsterDiet matchar det som finns i flitret.
    const matchesColor =
      activeFilters.colors.length === 0 ||
      activeFilters.colors.includes(monster.monsterColor);

    // Monstret returneras bara om både matchesType och matchesColor är lika med true.
    // I ett fall där det inte finns några filter kommer båda villkoren alltid vara sanna och därför returnera all monster

    return matchesType && matchesColor;
  });

  renderMonsters(filteredMonsters);
};

const dietSelectFilter = document.querySelector("#monsterDietSelectFilter");
// Välj dropdown-elementet för dieter med id "monsterDietSelectFilter".

dietSelectFilter.addEventListener("change", () => {
  // Lägg till en eventlyssnare för när värdet ändras i dietSelectFilter.
  activeFilters.types = dietSelectFilter.value;
  // Sätt det aktiva filtret för typer till det valda värdet från dropdown-menyn.
  console.log(dietSelectFilter.value);
  // Logga det valda värdet från dropdown-menyn i konsolen.
  console.log(activeFilters.types);
  // Logga det aktiva filtret för typer i konsolen.
  applyFilter();
  // Anropa funktionen applyFilter för att uppdatera visningen baserat på det valda filtret.
});

const updateColorFilters = () => {
  const colorCounts = {};

  colors.forEach((color) => {
    colorCounts[color.name.trim().toLowerCase()] = 0;
  });

  monsters.forEach((monster) => {
    const monsterColorNormalized = monster.monsterColor.trim().toLowerCase();

    if (colorCounts[monsterColorNormalized] !== undefined) {
      colorCounts[monsterColorNormalized] += 1;
    }
  });

  // Definiera en funktion för att uppdatera färgfiltret.
  const colorFilters = document.querySelector(".color-filters");
  // Välj elementet som innehåller färgfiltret.
  const colorFiltersHtml = colors.map((color) => {
    const normalizedColorName = color.name.trim().toLowerCase();
    const count = colorCounts[normalizedColorName];
    // Skapa en HTML-sträng för varje färg i colors-arrayen.
    return `<span class="color-filter-boxes"><input type="checkbox" class="color-to-filter-by" id="${color.color}" name="filter-${color.color}"  >
    <label for="${color.color}">${color.name} (${count})</label> </span>`;
    // Skapa en checkbox och en label för varje färg.
  });

  colorFilters.innerHTML = colorFiltersHtml.join("");
  // Sätt innerHTML av colorFilters till den skapade HTML-strängen.

  const colorFilterDivs = document.querySelectorAll(".color-to-filter-by");
  // Välj alla checkboxar för färgfiltret.

  colorFilterDivs.forEach((checkbox) => {
    // Loopar igenom varje checkbox.
    checkbox.addEventListener("change", () => {
      // Lägg till en eventlyssnare för när checkboxen ändras.
      if (checkbox.checked) {
        // Om checkboxen är markerad:
        activeFilters.colors.push(formatText(checkbox.id));
        // Lägg till den formaterade färgen i activeFilters.colors.
        console.log(activeFilters.colors);
        // Logga de aktiva färgfiltret i konsolen.
      } else {
        // Om checkboxen inte är markerad:
        activeFilters.colors = activeFilters.colors.filter(
          // Filtrera bort den avmarkerade färgen från activeFilters.colors.
          (filter) => filter !== formatText(checkbox.id)
          // Håll endast kvar färger som inte matchar den avmarkerade.
        );
        console.log(activeFilters.colors);
        // Logga de uppdaterade aktiva färgfiltret i konsolen.
      }

      applyFilter();
      // Anropa funktionen applyFilter för att uppdatera visningen baserat på de valda filtren.
    });
  });
};

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
const monsters = [
  {
    name: "Henke Penke Bennke Krenke",
    monsterDiet: monsterDiets[Math.floor(Math.random() * monsterDiets.length)],
    monsterType: monsterTypes[Math.floor(Math.random() * monsterTypes.length)],
    monsterSize: monsterSizes[Math.floor(Math.random() * monsterSizes.length)],
    monsterColor: formatText(colors[0].color),
    monsterValues: [
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
    ],
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
    monsterDiet: monsterDiets[Math.floor(Math.random() * monsterDiets.length)],
    monsterType: monsterTypes[Math.floor(Math.random() * monsterTypes.length)],
    monsterSize: monsterSizes[Math.floor(Math.random() * monsterSizes.length)],
    monsterColor: formatText(colors[1].color),
    monsterValues: [
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
    ],
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
    monsterDiet: monsterDiets[Math.floor(Math.random() * monsterDiets.length)],
    monsterType: monsterTypes[Math.floor(Math.random() * monsterTypes.length)],
    monsterSize: monsterSizes[Math.floor(Math.random() * monsterSizes.length)],
    monsterColor: formatText(colors[3].color),
    monsterValues: [
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
      Math.floor(Math.random() * 7),
    ],
    removeMonster() {
      const index = monsters.indexOf(this);
      if (index > -1) {
        monsters.splice(index, 1);

        applyFilter();
      }
    },
  },
];
