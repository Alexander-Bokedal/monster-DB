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

import {
  saveButton,
  monsterNameShow,
  monsterSliders,
  colorsToChooseFrom,
  doneButton,
  testButton,
  monsterNameInputField,
  checkNameLength,
  clearFilterButton,
  dietSelectFilter,
  monsterDiet,
  monsterDietFilter,
  monsterType,
  monsterSize,
  monsterDietIcon,
  monsterTypeIcon,
  monsterSizeIcon,
  searchInput,
  monsterPreviewWindow,
  changeMonsterLeftBtn,
  changeMonsterRightBtn,
  themeSwitch,
  muteSwitch,
} from "./dom.js";

import {
  randomNames,
  attributes,
  colors,
  monsterDiets,
  monsterTypes,
  monsterSizes,
  monsterImages,
  monsterIntros,
  backgroundMusic,
  soundmodeImgArray,
  effectSounds,
  randomDeleteSounds,
  darkmodeImgArray,
} from "./variables.js";

import { formatText } from "./formatting.js";
import { dropdown } from "./dropdown.js";
import { darkmode, mutemode } from "./darkmode.js";

let activeFilters = {
  types: "",
  colors: [],
  search: "",
};

let colorSelection = null;

let monsterToEditIndex = null;
const monsters = [];

saveButton.addEventListener("click", (event) => {
  event.preventDefault();
  monsters[monsterToEditIndex].saveMonster();
  // Kör monstrets lokala function för att spara sig själv
});

const cleanForm = () => {
  // Städa upp form
  document.querySelector(".monster-settings").reset();
  colorSelection = null;
  document.querySelector(".show-color-selection").innerHTML = "";
  initalizeSliders();
  monsterDietIcon.innerHTML = "";
  monsterTypeIcon.innerHTML = "";
  monsterSizeIcon.innerHTML = "";
  monsterNameShow.innerHTML = "";
};

// Globala funktioner slutar!

// Global array för att lagra monster
//==============================SAVE==============================

// Global array för att kunna ändra namn i preview                                                                    //===========================SLIDERS======================

const editableSliders = attributes.map((attribute, index) => ({
  // Gör en arrowfunction med .map funktion på varje element i attributes
  name: attribute,
  // Tilldela egenskapen "name" med värdet av variabeln "value"
  html: `<div class="slider"> 
    <!--Starta HTML-strukturen för slidern-->

    <label for="${attribute}slider">${attribute}</label> 
    <!--Skapa en etikett för slidern kopplad till "value"-->

    <br/>
    <input type="range" id="${attribute}slider" min="0" max="6" /> 
    <!--Skapa en slider med ett unikt ID baserat på "index" och sätt min- och max-värden-->

    <span id="value${attribute}"></span> 
    <!--Skapa ett span-element för att visa sliderns aktuella värde, med unikt ID-->

  </div>`,
  // Avsluta HTML-strukturen för slidern

  updateSliderValue(input = 3) {
    // Definiera en metod för att uppdatera sliderns värde

    let slider = document.querySelector(`#${attribute}slider`);
    // Hämta input-elementet för slidern med ID baserat på "index"
    let valueDisplay = document.querySelector(`#value${attribute}`);
    // Hämta span-elementet med ID baserat på "index" för att visa värdet

    slider.value = input;
    valueDisplay.textContent = input;
    // Sätt textinnehållet i span-elementet till det nuvarande värdet av slidern

    slider.addEventListener("input", (event) => {
      // Lägg till en eventlyssnare för "input"-händelsen på slidern

      valueDisplay.textContent = event.target.value;
      // Uppdatera textinnehållet i span-elementet med det aktuella värdet av slidern
    });
  },
}));

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

const colorsHtml = colors.map(
  (color) =>
    `<div class="color-container">
  <p>${formatText(color.name)}</p>
  <button class="color-box" 
  id="${color.name}-button" 
  style="background-color: ${color.color};"></button>
  </div>`
);

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

      const showColorSelection = document.querySelector(
        ".show-color-selection"
      );
      // Hämta elementet med klassen "show-color-selection"

      showColorSelection.innerHTML = `<div class="color-selection" style="background: radial-gradient(circle, ${colorSelection} 10%, rgba(255, 255, 255, 0) 90%);"></div>`;
      // Uppdatera den inre HTML av "show-color-selection" för att visa den valda färgen

      playEffect(colorSelection.toLowerCase());
      // Hämta namnet på den specifika fäger i lowerCase
      // Logiken blir playEffect(red); vilket är precis vad vi vill!

      // Skriv ut den valda färgen i konsolen
    });
  });
};

// Alla funktioner som behöver köras när man laddar sidan första gången
window.onload = () => {
  saveButton.classList.add("hidden");
  // Gömmer savebutton på load
  renderMonsters();
  updateColorFilters();
  updateMonsterSliders();
  updateColors();
  initalizeSliders();
  updatePreWindow();
};

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ FUNKTIONER ON LOAD           //////////
/////   SÖKORD: onLoad                       //////////
///////////////////////////////////////////////////////

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD FÖR ATT LÄGGA TILL MONSTER       /////////
//////  SÖKORD: addMonster                        ////
///////////////////////////////////////////////////////

testButton.addEventListener("click", (e) => {
  // Lägg till en eventlyssnare för "click"-händelsen på "testButton"
  e.preventDefault(); // Förhindra standardbeteendet för händelsen (t.ex. att formuläret skickas)
  let randomNumber = Math.floor(Math.random() * monsterImages.length);
  // Lägg till ett nytt monsterobjekt i "monsters" arrayen
  monsters.push({
    name: randomNames[Math.floor(Math.random() * randomNames.length)], // Sätt namnet på monstret till "Test Monster"
    monsterDiet:
      monsterDiets[Math.floor(Math.random() * monsterDiets.length)].icon,
    // Välj en slumpmässig diet från "monsterDiets" arrayen
    monsterType:
      monsterTypes[Math.floor(Math.random() * monsterTypes.length)].icon,
    // Välj en slumpmässig typ från "monsterTypes" arrayen
    monsterSize:
      monsterSizes[Math.floor(Math.random() * monsterSizes.length)].icon,
    // Välj en slumpmässig storlek från "monsterSizes" arrayen
    monsterImage: monsterImages[randomNumber],
    monsterImageIndex: [randomNumber],

    monsterColor: formatText(
      // Formatera och sätt färgen på monstret
      colors[Math.floor(Math.random() * colors.length)].color
      // Välj en slumpmässig färg från "colors" arrayen och formatera den
    ),
    rarity: Math.floor(Math.random() * 10) + 1,

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

    editMonster() {
      monsterToEditIndex = monsters.indexOf(this);

      monsterNameInputField.value = this.name;
      // Hämta värdet från monsterName inputfältet
      monsterDiet.value = this.monsterDiet;
      // Hämta valt värde från dietinputfältet
      monsterType.value = this.monsterType;
      // Hämta valt värde från typinputfältet
      monsterSize.value = this.monsterSize;
      colorSelection = this.monsterColor;
      monsterImageIndex = this.monsterImageIndex;
      //Sätt globalt monsterImageIndex till samma som monstret
      updatePreWindow();
      //Uppdatera bilden i preview window

      attributes.forEach((attribute) => {
        let slider = document.querySelector(`#${attribute}slider`);
        // Hämta input-elementet för slidern med ID baserat på "index"
        let valueDisplay = document.querySelector(`#value${attribute}`);
        // Hämta span-elementet med ID baserat på "index" för att visa värdet

        slider.value = monsters[monsterToEditIndex][attribute];
        valueDisplay.textContent = monsters[monsterToEditIndex][attribute];
        console.log(slider.value);
        console.log(monsters[monsterToEditIndex][attribute]);
      });

      // Global variabel för att saveknappen ska veta vems funktion den ska kalla

      saveButton.classList.remove("hidden");
      // Visar saveButton
      doneButton.classList.add("hidden");
      // Gömmer doneButton
    },
    saveMonster() {
      const monsterToSave = monsters[monsterToEditIndex];

      if (monsterNameInputField.value !== "") {
        monsterToSave.name = formatText(monsterNameInputField.value);
      }
      monsterToSave.monsterDiet = monsterDiet.value;
      monsterToSave.monsterType = monsterType.value;
      monsterToSave.monsterSize = monsterSize.value;
      monsterToSave.monsterColor = formatText(colorSelection);
      monsterToSave.monsterImage = monsterImages[monsterImageIndex];
      monsterToSave.monsterImageIndex = monsterImageIndex;

      attributes.forEach((attribute) => {
        monsterToSave[attribute] = document.querySelector(
          `#${attribute}slider`
        ).value;
      });

      monsters[monsterToEditIndex] = monsterToSave;
      saveButton.classList.add("hidden");
      // Visar saveButton
      doneButton.classList.remove("hidden");
      // Gömmer doneButton
      applyFilter();
      cleanForm();
      monsterToEditIndex = null;
      // Global variabel för att saveknappen ska veta vems funktion den ska kalla
      monsterImageIndex = 0;
      // Global variabel för att välja monster image
      updatePreWindow();
      // Uppdatera bilden i preview window
    },
  });

  // Skriv ut hela "monsters" arrayen i konsolen
  applyFilter();
  // Anropa "applyFilter" för att uppdatera visningen av monster
});

monsterNameInputField.addEventListener("input", () => {
  // Lägg till en eventlyssnare för "input"-händelsen på "monsterNameInputField"
  if (monsterNameInputField.value.length >= 28) {
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

  if (monsterNameInputField.value.length > 0) {
    monsterNameShow.innerHTML = `<h3> ${formatText(
      monsterNameInputField.value
    )}</h3>`;
  } else {
    monsterNameShow.innerHTML = `<h3></h3>`;
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

  const newMonsterImage = monsterImages[monsterImageIndex];

  const newMonsterDiet = monsterDiet.value;
  // Hämta valt värde från dietinputfältet
  const newMonsterType = monsterType.value;
  // Hämta valt värde från typinputfältet
  const newMonsterSize = monsterSize.value;
  // Hämta valt värde från storleksinputfältet
  const monsterAttributes = {};
  // Tomt objekt för attributes

  attributes.forEach((attribute) => {
    monsterAttributes[attribute] = document.querySelector(
      `#${attribute}slider`
    ).value;
  });

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
    //=============================NEW MONSTER=========================

    // Definiera ett nytt monsterobjekt
    name: formatText(monsterName),
    // Sätt namnet på monstret till det formaterade namnet från inputfältet
    monsterImage: newMonsterImage,

    monsterImageIndex: monsterImageIndex,

    monsterType: newMonsterType,
    // Sätt typ av monster till värdet från inputfältet
    monsterColor: formatText(colorSelection),
    // Sätt färg på monstret till den formaterade färgen som valts
    monsterDiet: newMonsterDiet,
    // Sätt diet på monstret till det valda dietvärdet
    monsterSize: newMonsterSize,
    // Sätt storlek på monstret till det valda storleksvärdet
    ...monsterAttributes,
    // Sätt värdena för monstret till arrayen med slidervärden
    rarity: Math.floor(Math.random() * 10) + 1,
    removeMonster() {
      // Definiera en metod för att ta bort monstret från listan
      const monsterIndex = monsters.indexOf(this);
      // Hämta indexet för det aktuella monstret
      if (monsterIndex > -1) {
        // Kontrollera om monstret finns i arrayen
        monsters.splice(monsterIndex, 1);
        // Ta bort monstret från arrayen med hjälp av dess index
        applyFilter();
        // Anropa "applyFilter" för att uppdatera visningen av monster
      }
    },
    editMonster() {
      monsterToEditIndex = monsters.indexOf(this);

      monsterNameInputField.value = this.name;
      // Hämta värdet från monsterName inputfältet
      monsterDiet.value = this.monsterDiet;
      // Hämta valt värde från dietinputfältet
      monsterType.value = this.monsterType;
      // Hämta valt värde från typinputfältet
      monsterSize.value = this.monsterSize;
      colorSelection = this.monsterColor;
      monsterImageIndex = this.monsterImageIndex;
      //Sätt globalt monsterImageIndex till samma som monstret
      updatePreWindow();
      //Uppdatera bilden i preview window

      attributes.forEach((attribute) => {
        let slider = document.querySelector(`#${attribute}slider`);
        // Hämta input-elementet för slidern med ID baserat på "index"
        let valueDisplay = document.querySelector(`#value${attribute}`);
        // Hämta span-elementet med ID baserat på "index" för att visa värdet

        slider.value = monsters[monsterToEditIndex][attribute];
        valueDisplay.textContent = monsters[monsterToEditIndex][attribute];
        console.log(slider.value);
        console.log(monsters[monsterToEditIndex][attribute]);
      });

      // Global variabel för att saveknappen ska veta vems funktion den ska kalla

      saveButton.classList.remove("hidden");
      // Visar saveButton
      doneButton.classList.add("hidden");
      // Gömmer doneButton
    },
    saveMonster() {
      const monsterToSave = monsters[monsterToEditIndex];

      if (monsterNameInputField.value !== "") {
        monsterToSave.name = formatText(monsterNameInputField.value);
      }
      monsterToSave.monsterDiet = monsterDiet.value;
      monsterToSave.monsterType = monsterType.value;
      monsterToSave.monsterSize = monsterSize.value;
      monsterToSave.monsterColor = formatText(colorSelection);
      monsterToSave.monsterImage = monsterImages[monsterImageIndex];
      monsterToSave.monsterImageIndex = monsterImageIndex;

      attributes.forEach((attribute) => {
        monsterToSave[attribute] = document.querySelector(
          `#${attribute}slider`
        ).value;
      });

      monsters[monsterToEditIndex] = monsterToSave;
      saveButton.classList.add("hidden");
      // Visar saveButton
      doneButton.classList.remove("hidden");
      // Gömmer doneButton
      applyFilter();
      cleanForm();
      monsterToEditIndex = null;
      // Global variabel för att saveknappen ska veta vems funktion den ska kalla
      monsterImageIndex = 0;
      // Global variabel för att välja monster image
      updatePreWindow();
      // Uppdatera bilden i preview window
    },
  };

  monsters.push(newMonster);

  // VAD SOM BEHÖVER GÖRAS:
  // EN FUNKTION FÖR ATT RENSA FORMULÄRET

  // FUNKTION FÖR ATT VISA MONSTER I LISTAN
  applyFilter();

  cleanForm();
  checkIfFormFilled.innerHTML = "";

  const monsterCards = document.querySelectorAll(".monster-card");
  const lastMonsterCard = monsterCards[monsterCards.length - 1];

  const rarity = newMonster.rarity;
  lastMonsterCard.classList.remove("rare", "uncommon", "common");

  if (rarity === 1) {
    lastMonsterCard.classList.add("rare");
    console.log(`Rare class added to the new monster card`);
  } else if (rarity > 1 && rarity < 5) {
    lastMonsterCard.classList.add("uncommon");
    console.log(`Uncommon class added to the new monster card`);
  } else {
    lastMonsterCard.classList.add("common");
    console.log(`Common class added to the new monster card`);
  }
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

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD för att visa MONSTER             /////////
//////  SÖKORD: renderMonsters               //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const renderMonsters = (filteredMonsters = monsters) => {
  const monsterGallery = document.getElementById("monster-gallery-container");
  monsterGallery.innerHTML = "";

  const monsterGalleryHtmlArray = filteredMonsters.map((monster) => {
    let valuesToPresentInHtml = "";
    attributes.forEach((attribute) => {
      if (monster[attribute] > 0)
        valuesToPresentInHtml += `<p class="editable-value">${attribute}: ${monster[attribute]}</p>`;
    });

    return `
      <div class="monster-card" tabindex="0">
          <div class="monster-info-btns">

          <div class="edit-button">
          <img src="images/settings.png" alt="Edit" class="edit-icon" />
        </div>
          <h3 class="monster-name">${monster.name}</h3>
          <div class="delete-button">
          <img src="images/delete.png" alt="Delete"
          class="delete-icon" />
          </div>
          </div>
          
          <div id="card-image-container">
          
          <img id="monster-card-preview" src="${monster.monsterImage}" alt="Monster Preview" />
          <div class="monster-color" style="background: radial-gradient(circle, ${monster.monsterColor} 30%, rgba(255, 255, 255, 0) 90%);"></div>
          </div>
        <div class="monster-info" tabindex="0">
          <div class="icon-container">
          <p class="monster-diet">${monster.monsterDiet}</p>
          <p class="monster-type">${monster.monsterType}</p>
          <p class="monster-size">${monster.monsterSize}</p>
          </div>
          <div class="values-container">
          ${valuesToPresentInHtml}
          </div>

        </div>     
        </div>
      
    `;
  });

  monsterGallery.innerHTML = monsterGalleryHtmlArray.join("");

  let monsterCards = document.querySelectorAll(".monster-card");

  monsterCards.forEach((monsterCard, index) => {
    const rarity = monsters[index].rarity;

    monsterCard.classList.remove("rare", "uncommon", "common");

    if (rarity === 1) {
      monsterCard.classList.add("rare");
    } else if (rarity > 1 && rarity < 5) {
      monsterCard.classList.add("uncommon");
    } else {
      monsterCard.classList.add("common");
    }
  });

  const deleteButton = document.querySelectorAll(".delete-button");
  deleteButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      filteredMonsters[index].removeMonster();
      console.log("Deleted!");
      randomDeleteSound();
    });
  });

  const editButton = document.querySelectorAll(".edit-button");
  editButton.forEach((button, index) => {
    button.addEventListener("click", () => {
      filteredMonsters[index].editMonster();
    });
  });

  function updateMonsterCount() {
    const monsterCounter = document.querySelector("#monster-counter");
    monsterCounter.textContent = `Total Monsters: ${monsters.length}`;
  }

  const dietCounterHtml = document.querySelector(".diet-counter-container");
  const dietCounter = () => {
    const dietCounts = {};

    monsterDiets.forEach((diet) => {
      dietCounts[diet.diet] = monsters.filter(
        (monster) => monster.monsterDiet === diet.icon
      ).length;
    });

    dietCounterHtml.innerHTML = monsterDiets
      .map((diet) => {
        return `<div>${diet.icon}: ${dietCounts[diet.diet]}</div>`;
      })
      .join("");
  };

  const colorCountHtml = document.querySelectorAll(".color-count-container");
  const colorCounter = () => {
    const colorCounts = {};

    colors.forEach((color) => {
      colorCounts[`${color.color}-count`] = monsters.filter(
        (monster) => monster.monsterColor.toLowerCase() === color.color
      ).length;
    });

    colorCountHtml.forEach((colorCount) => {
      let key = colorCount.id;
      colorCount.innerHTML = `(${colorCounts[key]})`;
    });
  };

  updateMonsterCount();
  colorCounter();
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

clearFilterButton.addEventListener("click", (e) => {
  playEffect("changeValue");
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
  activeFilters.search = "";
  // Åsterställ till tom sträng i aktiva filter
  searchInput.value = "";
  // Rensa search rutan

  applyFilter();
  // Anropa funktionen för att tillämpa filter och uppdatera visningen av monster.
});

// Lyssna efter en förändring
monsterType.addEventListener("change", () => {
  monsterTypes.forEach((type) => {
    if (type.icon === monsterType.value) {
      monsterTypeIcon.innerHTML = type.icon;
      playEffect(type.sound);
    }
  });
});

monsterDiet.addEventListener("change", () => {
  monsterDiets.forEach((diet) => {
    if (diet.icon === monsterDiet.value) {
      monsterDietIcon.innerHTML = diet.icon;
      playEffect(diet.sound);
    }
  });
});

monsterSize.addEventListener("change", () => {
  monsterSizes.forEach((size) => {
    if (size.icon === monsterSize.value) {
      monsterSizeIcon.innerHTML = size.icon;
      playEffect(size.sound);
    }
  });
});

// Anropar functionen och lägger in rätt argument på rätt plats. Element, Array, text, värde.
dropdown(monsterDiet, monsterDiets, "diet", "icon");
dropdown(monsterDietFilter, monsterDiets, "diet", "icon");
dropdown(monsterType, monsterTypes, "type", "icon");
dropdown(monsterSize, monsterSizes, "size", "icon");

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD för att visa MONSTERYPES /////////
//////  SÖKORD: monsterType                  //////////
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
      activeFilters.types === "" || activeFilters.types === monster.monsterDiet;
    // Om "types" är lika med 0 så finns det inga filter, och det här villkoret blir sant
    // Om "types" har filter i sig returneras monstret bara om dess monsterDiet matchar det som finns i flitret.

    const matchesColor =
      activeFilters.colors.length === 0 ||
      activeFilters.colors.includes(monster.monsterColor);
    // Om "colors" är lika med 0 så finns det inga filter, och det här villkoret blir sant
    // Om "color" har filter i sig returneras monstret bara om dess monsterDiet matchar det som finns i flitret.

    const matchesSearch =
      activeFilters.search === "" ||
      (monster.name &&
        monster.name
          .toLowerCase()
          .includes(activeFilters.search.toLowerCase()));

    return matchesType && matchesColor && matchesSearch;
    // Monstret returneras bara om både matchesType och matchesColor och matchesSearch är lika med true.
    // I ett fall där det inte finns några filter kommer båda villkoren alltid vara sanna och därför returnera all monster
  });

  renderMonsters(filteredMonsters);
};

dietSelectFilter.addEventListener("change", () => {
  playEffect("changeValue");
  // Lägg till en eventlyssnare för när värdet ändras i dietSelectFilter.
  activeFilters.types = dietSelectFilter.value;
  // Sätt det aktiva filtret för typer till det valda värdet från dropdown-menyn.
  applyFilter();
  // Anropa funktionen applyFilter för att uppdatera visningen baserat på det valda filtret.
});

const updateColorFilters = () => {
  // Definiera en funktion för att uppdatera färgfiltret.
  const colorFilters = document.querySelector(".color-filters");
  // Välj elementet som innehåller färgfiltret.
  const colorFiltersHtml = colors.map((color) => {
    /* const count = colorCounts[color.name]; */
    // Skapa en HTML-sträng för varje färg i colors-arrayen.
    return `<span class="color-filter-boxes"><input type="checkbox" class="color-to-filter-by" id="${
      color.color
    }" name="filter-${color.color}"  >
    <label for="${color.color}">${formatText(
      color.name
    )}  <span class="color-count-container" id="${
      color.color
    }-count">(0)</span></label></span>`;
    // Skapa en checkbox och en label för varje färg.
  });

  colorFilters.innerHTML = colorFiltersHtml.join("");
  // Sätt innerHTML av colorFilters till den skapade HTML-strängen.

  const colorFilterDivs = document.querySelectorAll(".color-to-filter-by");
  // Välj alla checkboxar för färgfiltret.

  colorFilterDivs.forEach((checkbox) => {
    // Loopar igenom varje checkbox.
    checkbox.addEventListener("change", () => {
      playEffect("changeColor");
      // Lägg till en eventlyssnare för när checkboxen ändras.
      if (checkbox.checked) {
        // Om checkboxen är markerad:
        activeFilters.colors.push(formatText(checkbox.id));
        // Lägg till den formaterade färgen i activeFilters.colors.

        // Logga de aktiva färgfiltret i konsolen.
      } else {
        // Om checkboxen inte är markerad:
        activeFilters.colors = activeFilters.colors.filter(
          // Filtrera bort den avmarkerade färgen från activeFilters.colors.
          (filter) => filter !== formatText(checkbox.id)
          // Håll endast kvar färger som inte matchar den avmarkerade.
        );

        // Logga de uppdaterade aktiva färgfiltret i konsolen.
      }

      applyFilter();
      // Anropa funktionen applyFilter för att uppdatera visningen baserat på de valda filtren.
    });
  });
};

searchInput.addEventListener("input", () => {
  activeFilters.search = searchInput.value;

  applyFilter();
});

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD FÖR ATT FILTRERA           /////////
//////  SÖKORD: filterMonsterList             //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD FÖR ATT FILTRERA           /////////
//////  SÖKORD: filterMonsterList             //////////
///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD FÖR ATT FILTRERA           /////////
//////  SÖKORD: filterMonsterList             //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

// Allmänt
// VAD SOM BEHÖVER GÖRAS:

// Skapa en array men bilder på monsnter

let monsterImageIndex = 0;

const randomDeleteSound = () => {
  // Skapa en variabel som slumpmässigt får en indexplats från vår array.
  const randomIndex = Math.floor(Math.random() * randomDeleteSounds.length);
  randomDeleteSounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
  randomDeleteSounds[randomIndex].play();
};

const playEffect = (soundKey) => {
  if (effectSounds[soundKey]) {
    // Stoppa alla andra ljud innan vi spelar upp ett nytt
    Object.keys(effectSounds).forEach((key) => {
      // Gå igenom alla nyklar var för sig, loopa igenom med forEach.
      if (!effectSounds[key].paused) {
        // Kolla om det aktuella ljude INTE är pausat
        effectSounds[key].pause();
        // Om ljud spelas Pausa det.
        effectSounds[key].currentTime = 0;
        // Resetta det pausade ljudet.
      }
    });

    // Spela upp ljud! PLAY!
    effectSounds[soundKey].play();
  } else {
    console.warn(
      `Soundkey with "${soundKey}" does not exist. Please check obj @ row 966`
    );
  }
};

let currentIntroSound = null;

//Ljud spelas från index av intros
const playSoundForIndex = (index) => {
  if (currentIntroSound) {
    currentIntroSound.pause();
    currentIntroSound.currentTime = 0;
  }

  if (monsterIntros[index]) {
    currentIntroSound = monsterIntros[index];
    currentIntroSound.play();
  }
};

function updatePreWindow() {
  monsterPreviewWindow.src = monsterImages[monsterImageIndex];
}

updatePreWindow();

changeMonsterLeftBtn.addEventListener("click", () => {
  playEffect("changeMonster");
  if (monsterImageIndex > 0) {
    monsterImageIndex--;
  } else {
    monsterImageIndex = monsterImages.length - 1;
  }
  updatePreWindow();

  playSoundForIndex(monsterImageIndex);
});

changeMonsterRightBtn.addEventListener("click", () => {
  if (monsterImageIndex < monsterImages.length - 1) {
    playEffect("changeMonster");

    monsterImageIndex++;
  } else {
    monsterImageIndex = 0;
  }
  updatePreWindow();

  playSoundForIndex(monsterImageIndex);
});

// Anropa funktion darkmode
darkmode(themeSwitch, darkmodeImgArray);

// Anropa funktionen mutemode
mutemode(muteSwitch, soundmodeImgArray, backgroundMusic);
