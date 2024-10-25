import * as dom from "./dom.js";
import * as variable from "./variables.js";

import { formatText } from "./forms.js";
import { dropdown } from "./dropdown.js";
import { darkmode, mutemode } from "./extras.js";

let monsterToEditIndex = null;
const monsters = [];

//===========================SAVE===========================//

// När saveknappen trycks ska alla värden sparas
dom.saveButton.addEventListener("click", (event) => {
  event.preventDefault();
  // Kör monstrets lokala function för att spara sig själv
  monsters[monsterToEditIndex].saveMonster();
});

// När doneknappen trycks ska alla värden sparas
dom.doneButton.addEventListener("click", (event) => {
  addMonsterToArray(event);
});

//===========================SLIDERS===========================//

// Gör en arrowfunction med .map funktion på varje element i attributes

const editableSliders = variable.attributes.map((attribute) => ({
  // Tilldela egenskapen "name" med värdet av variabeln "value"
  name: attribute,

  // Starta HTML-strukturen för slidern
  html: `<div class="slider"> 

    <!--Skapa en etikett för slidern kopplad till "value"-->
    <label for="${attribute}slider">${attribute}</label> 
    
    <br/>
    <!--Skapa en slider med ett unikt ID baserat på "index" och sätt min- och max-värden-->
    <input type="range" id="${attribute}slider" min="0" max="6" /> 

    <!--Skapa ett span-element för att visa sliderns aktuella värde, med unikt ID-->
    <span id="value${attribute}"></span> 
    
  </div>`,
  // Avsluta HTML-strukturen för slidern

  // Definiera en metod för att uppdatera sliderns värde
  updateSliderValue(input = 3) {
    // Hämta elementet för slidern med ID baserat på "index" för att ta och visa värde
    let slider = document.querySelector(`#${attribute}slider`);
    let valueDisplay = document.querySelector(`#value${attribute}`);

    // Sätt textinnehållet i elementet till det nuvarande värdet av slidern
    slider.value = input;
    valueDisplay.textContent = input;

    // Lägg till en eventlyssnare för "input"-händelsen på slidern
    slider.addEventListener("input", (event) => {
      // Uppdatera textinnehållet i span-elementet med det aktuella värdet av slidern
      valueDisplay.textContent = event.target.value;
    });
  },
}));

// Definiera en funktion för att uppdatera monster-sliders
const updateMonsterSliders = () => {
  // Definiera en funktion för att uppdatera monster-sliders
  dom.monsterSliders.innerHTML = editableSliders
    .map((obj) => obj.html)
    .join("");

  // Generera HTML från varje objekt i "editableSliders" och sätt den som inre HTML av "monsterSliders"
};

// Definiera en funktion för att initiera sliders
const initalizeSliders = () => {
  // Loopar igenom varje "slider" i "editableSliders"
  editableSliders.forEach((slider) => {
    // Anropa metoden "updateSliderValue" för att sätta upp eventlyssnare och visa initialvärdet för varje slider
    slider.updateSliderValue();
  });
};

//===========================Colors===========================//

let activeFilters = {
  types: "",
  colors: [],
  search: "",
};

let colorSelection = null;

const colorsHtml = variable.colors.map(
  (color) =>
    `<div class="color-container">
  <p>${formatText(color.name)}</p>
  <button class="color-box" 
  id="${color.name}-button" 
  style="background-color: ${color.color};"></button>
  </div>`
);

// Definiera en funktion för att uppdatera färger
const updateColors = () => {
  // Definiera en funktion för att uppdatera färger
  dom.colorsToChooseFrom.innerHTML = colorsHtml.join("");

  // Sätt den inre HTML av "colorsToChooseFrom" till sammanfogad HTML-sträng från "colorsHtml"
  // Hämta alla HTML-element med klassen "color-box" och tilldela dem till variabeln "colorDivs"
  const colorDivs = document.querySelectorAll(".color-box");

  // Loopar igenom varje "button" i "colorDivs"
  colorDivs.forEach((button) => {
    // Lägg till en eventlyssnare för "click"-händelsen på varje "button"
    button.addEventListener("click", (event) => {
      // Förhindra standardbeteendet för händelsen
      event.preventDefault();
      // Tilldela variabeln "colorSelection" den bakgrundsfärg som är inställd för knappen som klickades
      colorSelection = button.style.backgroundColor;
      // Hämta elementet med klassen "show-color-selection"
      const showColorSelection = document.querySelector(
        ".show-color-selection"
      );

      // Uppdatera den inre HTML av "show-color-selection" för att visa den valda färgen
      showColorSelection.innerHTML = `<div class="color-selection" style="background: radial-gradient(circle, ${colorSelection} 10%, rgba(255, 255, 255, 0) 90%);"></div>`;

      // Hämta namnet på den specifika fäger i lowerCase
      playEffect(colorSelection.toLowerCase());

      // Logiken blir playEffect(red); vilket är precis vad vi vill!
    });
  });
};

// Alla funktioner som behöver köras när man laddar sidan första gången
window.onload = () => {
  dom.saveButton.classList.add("hidden");
  renderMonsters();
  updateColorFilters();
  updateMonsterSliders();
  updateColors();
  initalizeSliders();
  updatePreWindow();
};

//===========================Testknapp===========================//

// Lägg till en eventlyssnare för "click"-händelsen på "testButton"
dom.testButton.addEventListener("click", (e) => {
  e.preventDefault(); // Förhindra standardbeteendet för händelsen (t.ex. att formuläret skickas)

  const monsterAttributes = {};
  // Tomt objekt för attributes

  variable.attributes.forEach((attribute) => {
    monsterAttributes[attribute] = Math.floor(Math.random() * 7);
  });

  // Lägg till ett nytt monsterobjekt i "monsters" arrayen
  let randomNumber = Math.floor(Math.random() * variable.monsterImages.length);
  monsters.push({
    name: variable.randomNames[
      Math.floor(Math.random() * variable.randomNames.length)
    ], // Sätt namnet på monstret till "Test Monster"
    monsterDiet:
      variable.monsterDiets[
        Math.floor(Math.random() * variable.monsterDiets.length)
      ].icon,
    // Välj en slumpmässig diet från "monsterDiets" arrayen
    monsterType:
      variable.monsterTypes[
        Math.floor(Math.random() * variable.monsterTypes.length)
      ].icon,
    // Välj en slumpmässig typ från "monsterTypes" arrayen
    monsterSize:
      variable.monsterSizes[
        Math.floor(Math.random() * variable.monsterSizes.length)
      ].icon,
    // Välj en slumpmässig storlek från "monsterSizes" arrayen
    monsterImage: variable.monsterImages[randomNumber],
    monsterImageIndex: [randomNumber],
    ...monsterAttributes,

    monsterColor: formatText(
      // Formatera och sätt färgen på monstret
      variable.colors[Math.floor(Math.random() * variable.colors.length)].color
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

      dom.monsterNameInputField.value = this.name;
      // Hämta värdet från monsterName inputfältet
      dom.monsterDiet.value = this.monsterDiet;
      // Hämta valt värde från dietinputfältet
      dom.monsterType.value = this.monsterType;
      // Hämta valt värde från typinputfältet
      dom.monsterSize.value = this.monsterSize;
      colorSelection = this.monsterColor;
      monsterImageIndex = this.monsterImageIndex;
      //Sätt globalt monsterImageIndex till samma som monstret
      updatePreWindow();
      //Uppdatera bilden i preview window

      variable.attributes.forEach((attribute) => {
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

      dom.saveButton.classList.remove("hidden");
      // Visar saveButton
      dom.doneButton.classList.add("hidden");
      // Gömmer doneButton
    },
    saveMonster() {
      const monsterToSave = monsters[monsterToEditIndex];

      if (dom.monsterNameInputField.value !== "") {
        monsterToSave.name = formatText(dom.monsterNameInputField.value);
      }
      monsterToSave.monsterDiet = dom.monsterDiet.value;
      monsterToSave.monsterType = dom.monsterType.value;
      monsterToSave.monsterSize = dom.monsterSize.value;
      monsterToSave.monsterColor = formatText(colorSelection);
      monsterToSave.monsterImage = variable.monsterImages[monsterImageIndex];
      monsterToSave.monsterImageIndex = monsterImageIndex;

      variable.attributes.forEach((attribute) => {
        monsterToSave[attribute] = document.querySelector(
          `#${attribute}slider`
        ).value;
      });

      monsters[monsterToEditIndex] = monsterToSave;
      dom.saveButton.classList.add("hidden");
      // Visar saveButton
      dom.doneButton.classList.remove("hidden");
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

dom.monsterNameInputField.addEventListener("input", () => {
  // Lägg till en eventlyssnare för "input"-händelsen på "monsterNameInputField"
  if (dom.monsterNameInputField.value.length >= 28) {
    // Kontrollera om längden på värdet i inputfältet är längre än 28 tecken
    dom.checkNameLength.innerHTML = "";
    // Rensa tidigare meddelande
    dom.checkNameLength.innerHTML = `<p style="color:red">Name is too long!</p>`;
    // Visa ett meddelande i röd text som informerar att namnet är för långt
    dom.doneButton.disabled = true;
    // Inaktivera "doneButton" så att det inte kan klickas
  } else {
    // Om längden på namnet är 28 tecken eller kortare
    dom.checkNameLength.innerHTML = "";
    // Rensa meddelandet
    dom.doneButton.disabled = false;
    // Aktivera "doneButton" så att det kan klickas
  }

  if (dom.monsterNameInputField.value.length > 0) {
    dom.monsterNameShow.innerHTML = `<h3> ${formatText(
      dom.monsterNameInputField.value
    )}</h3>`;
  } else {
    dom.monsterNameShow.innerHTML = `<h3></h3>`;
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
  const monsterName = dom.monsterNameInputField.value;
  // Hämta värdet från monsterName inputfältet

  const newMonsterImage = variable.monsterImages[monsterImageIndex];

  const newMonsterDiet = dom.monsterDiet.value;
  // Hämta valt värde från dietinputfältet
  const newMonsterType = dom.monsterType.value;
  // Hämta valt värde från typinputfältet
  const newMonsterSize = dom.monsterSize.value;
  // Hämta valt värde från storleksinputfältet
  const monsterAttributes = {};
  // Tomt objekt för attributes

  variable.attributes.forEach((attribute) => {
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

      dom.monsterNameInputField.value = this.name;
      // Hämta värdet från monsterName inputfältet
      dom.monsterDiet.value = this.monsterDiet;
      // Hämta valt värde från dietinputfältet
      dom.monsterType.value = this.monsterType;
      // Hämta valt värde från typinputfältet
      dom.monsterSize.value = this.monsterSize;
      colorSelection = this.monsterColor;
      monsterImageIndex = this.monsterImageIndex;
      //Sätt globalt monsterImageIndex till samma som monstret
      updatePreWindow();
      //Uppdatera bilden i preview window

      variable.attributes.forEach((attribute) => {
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

      dom.saveButton.classList.remove("hidden");
      // Visar saveButton
      dom.doneButton.classList.add("hidden");
      // Gömmer doneButton
    },
    saveMonster() {
      const monsterToSave = monsters[monsterToEditIndex];

      if (dom.monsterNameInputField.value !== "") {
        monsterToSave.name = formatText(dom.monsterNameInputField.value);
      }
      monsterToSave.monsterDiet = dom.monsterDiet.value;
      monsterToSave.monsterType = dom.monsterType.value;
      monsterToSave.monsterSize = dom.monsterSize.value;
      monsterToSave.monsterColor = formatText(colorSelection);
      monsterToSave.monsterImage = variable.monsterImages[monsterImageIndex];
      monsterToSave.monsterImageIndex = monsterImageIndex;

      variable.attributes.forEach((attribute) => {
        monsterToSave[attribute] = document.querySelector(
          `#${attribute}slider`
        ).value;
      });

      monsters[monsterToEditIndex] = monsterToSave;
      dom.saveButton.classList.add("hidden");
      // Visar saveButton
      dom.doneButton.classList.remove("hidden");
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

const renderMonsters = (filteredMonsters = monsters) => {
  const monsterGallery = document.getElementById("monster-gallery-container");
  monsterGallery.innerHTML = "";

  const monsterGalleryHtmlArray = filteredMonsters.map((monster) => {
    let valuesToPresentInHtml = "";
    variable.attributes.forEach((attribute) => {
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

    variable.monsterDiets.forEach((diet) => {
      dietCounts[diet.diet] = monsters.filter(
        (monster) => monster.monsterDiet === diet.icon
      ).length;
    });

    dietCounterHtml.innerHTML = variable.monsterDiets
      .map((diet) => {
        return `<div>${diet.icon}: ${dietCounts[diet.diet]}</div>`;
      })
      .join("");
  };

  const colorCountHtml = document.querySelectorAll(".color-count-container");
  const colorCounter = () => {
    const colorCounts = {};

    variable.colors.forEach((color) => {
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

dom.clearFilterButton.addEventListener("click", (e) => {
  playEffect("changeValue");
  // Lägg till en klick-händelse för knappen.
  e.preventDefault();
  // Förhindra standardbeteendet för knappen, t.ex. att skicka ett formulär.

  dom.monsterDietFilter.value = "";
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
  dom.searchInput.value = "";
  // Rensa search rutan

  applyFilter();
  // Anropa funktionen för att tillämpa filter och uppdatera visningen av monster.
});

// Dropdown funktion med olika parametrar som agerar som "placeholders" för olika värden
function monsterAttribute(selectElement, iconElement, attributeArray) {
  // När SelectElement ändras ska eventet köras
  selectElement.addEventListener("change", () => {
    // Använder find funktion som letar igenom arrayen och ser om värdet för icon är samma som den nuvarande dropdown värdet
    const selected = attributeArray.find(
      (attr) => attr.icon === selectElement.value
    );
    // Om den är samma så sätter den texten som det hittade värdet och spelar upp valt ljud
    if (selected) {
      iconElement.innerHTML = selected.icon;
      playEffect(selected.sound);
    }
  });
}

// Anropar funktionen och lägger in rätt argument på rätt plats. Element, Element, värde.
monsterAttribute(dom.monsterType, dom.monsterTypeIcon, variable.monsterTypes);
monsterAttribute(dom.monsterDiet, dom.monsterDietIcon, variable.monsterDiets);
monsterAttribute(dom.monsterSize, dom.monsterSizeIcon, variable.monsterSizes);

// Anropar funktionen och lägger in rätt argument på rätt plats. Element, Array, text, värde.
dropdown(dom.monsterDiet, variable.monsterDiets, "diet", "icon");
dropdown(dom.monsterDietFilter, variable.monsterDiets, "diet", "icon");
dropdown(dom.monsterType, variable.monsterTypes, "type", "icon");
dropdown(dom.monsterSize, variable.monsterSizes, "size", "icon");

// Applyfilter kollar om det finns aktiva filter och returnerar monster utifrån de filtrerna
// Finns det inga aktiva filter kommer alla monster att returneras och därför mapas ut med renderMonsters()
// Koden är gjord för att man ska kunna filtrera på flera sätt åt gången, dvs typ och färg

//===========================Filter===========================//

// Funktion för att städa upp formen
const cleanForm = () => {
  document.querySelector(".monster-settings").reset();
  colorSelection = null;
  document.querySelector(".show-color-selection").innerHTML = "";
  initalizeSliders();
  dom.monsterDietIcon.innerHTML = "";
  dom.monsterTypeIcon.innerHTML = "";
  dom.monsterSizeIcon.innerHTML = "";
  dom.monsterNameShow.innerHTML = "";
};

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

dom.dietSelectFilter.addEventListener("change", () => {
  playEffect("changeValue");
  // Lägg till en eventlyssnare för när värdet ändras i dietSelectFilter.
  activeFilters.types = dom.dietSelectFilter.value;
  // Sätt det aktiva filtret för typer till det valda värdet från dropdown-menyn.
  applyFilter();
  // Anropa funktionen applyFilter för att uppdatera visningen baserat på det valda filtret.
});

const updateColorFilters = () => {
  // Definiera en funktion för att uppdatera färgfiltret.
  const colorFilters = document.querySelector(".color-filters");
  // Välj elementet som innehåller färgfiltret.
  const colorFiltersHtml = variable.colors.map((color) => {
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

dom.searchInput.addEventListener("input", () => {
  activeFilters.search = dom.searchInput.value;

  applyFilter();
});

//===========================Extra===========================//

let monsterImageIndex = 0;

const randomDeleteSound = () => {
  // Skapa en variabel som slumpmässigt får en indexplats från vår array.
  const randomIndex = Math.floor(
    Math.random() * variable.randomDeleteSounds.length
  );
  variable.randomDeleteSounds.forEach((sound) => {
    sound.pause();
    sound.currentTime = 0;
  });
  variable.randomDeleteSounds[randomIndex].play();
};

const playEffect = (soundKey) => {
  if (variable.effectSounds[soundKey]) {
    // Stoppa alla andra ljud innan vi spelar upp ett nytt
    Object.keys(variable.effectSounds).forEach((key) => {
      // Gå igenom alla nyklar var för sig, loopa igenom med forEach.
      if (!variable.effectSounds[key].paused) {
        // Kolla om det aktuella ljude INTE är pausat
        variable.effectSounds[key].pause();
        // Om ljud spelas Pausa det.
        variable.effectSounds[key].currentTime = 0;
        // Resetta det pausade ljudet.
      }
    });

    // Spela upp ljud! PLAY!
    variable.effectSounds[soundKey].play();
  } else {
    console.warn(
      `Soundkey with "${soundKey}" does not exist in the array of available sounds.`
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

  if (variable.monsterIntros[index]) {
    currentIntroSound = variable.monsterIntros[index];
    currentIntroSound.play();
  }
};

function updatePreWindow() {
  dom.monsterPreviewWindow.src = variable.monsterImages[monsterImageIndex];
}

updatePreWindow();

dom.changeMonsterLeftBtn.addEventListener("click", () => {
  playEffect("changeMonster");
  if (monsterImageIndex > 0) {
    monsterImageIndex--;
  } else {
    monsterImageIndex = variable.monsterImages.length - 1;
  }
  updatePreWindow();

  playSoundForIndex(monsterImageIndex);
});

dom.changeMonsterRightBtn.addEventListener("click", () => {
  if (monsterImageIndex < variable.monsterImages.length - 1) {
    playEffect("changeMonster");

    monsterImageIndex++;
  } else {
    monsterImageIndex = 0;
  }
  updatePreWindow();
  playSoundForIndex(monsterImageIndex);
});

// Anropa funktion darkmode
darkmode(dom.themeSwitch, variable.darkmodeImgArray);

// Anropa funktionen mutemode
mutemode(dom.muteSwitch, variable.soundmodeImgArray, variable.backgroundMusic);
