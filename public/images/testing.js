const editableSliderNames = ["Tentacles", "Horns", "Eyes", "Legs"];

const editableSliders = editableSliderNames.map((value, index) => ({
  name: value,
  html: `<div class="slider">
    <label for="${value}">${value}</label>
    <br />
    <input type="range" id="slider${index + 1}" min="0" max="6" />
    <span id="value${index + 1}"></span>
  </div>`,
}));

const monsterSliders = document.querySelector("#sliders");

const updateMonsterSliders = () => {
  monsterSliders.innerHTML = editableSliders.map((obj) => obj.html).join("");
};

window.onload = () => {
  renderMonsters();
  updateMonsterSliders();
  updateColors();
  updateColorFilters();
  updateSliderValue("slider1", "value1");
  updateSliderValue("slider2", "value2");
  updateSliderValue("slider3", "value3");
  updateSliderValue("slider4", "value4");
};

const addMonsterToArray = (event) => {
  event.preventDefault();

  //SKAPA BEHÅLLARE MED INNEHÅLL FRÅN INPUTFORM!
  // VAD SOM BEHÖVER GÖRAS:
  // Se över denna kod så att den matchar inputform
  // Skapa kod som tillåter det här att redigeras på ett ställe (VG NIVÅ - MÖJLIGTVIS DEN SVÅRASTE PUNKTEN I HELA PROJEKTET (ELLER SÅ ÄR DET JAG SOM ÄR KORKAD))
  /*   const monsterName = document.getElementById("monsterName").value; */

  // 9/10 - Nya värden som funkar bra vvvvvvvv
  const newMonsterDiet = monsterDiet.value;
  const newMonsterType = monsterType.value;
  const newMonsterSize = monsterSize.value;
  const sliderValuesToAddToMonsterObject = [];
  const arrayOfAllSliders = document.querySelectorAll(".slider");
  const amountOfSliders = arrayOfAllSliders.length;

  for (let i = 0; i < amountOfSliders; i++) {
    sliderValuesToAddToMonsterObject.push(
      document.querySelector(`#slider${i + 1}`).value
    );
  }

  // SKAPA ETT MONSTER SOM ETT OBJEKT
  const newMonster = {
    /*     name: monsterName, */
    monsterType: newMonsterType,
    monsterColor: colorSelection,
    monsterDiet: newMonsterDiet,
    monsterSize: newMonsterSize,
    monsterValues: sliderValuesToAddToMonsterObject,
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
  applyFilter();

  // Städa upp form
  document.querySelector("#monsterSettings").reset();
  colorSelection = null;
  document.querySelector(".show-color-selection").innerHTML = "None";
  updateSliderValue("slider1", "value1");
  updateSliderValue("slider2", "value2");
  updateSliderValue("slider3", "value3");
  updateSliderValue("slider4", "value4");
};

const renderMonsters = (filteredMonsters = monsters) => {
  // VAD SOM BEHÖVER GÖRAS:
  // ANPASSA SÅ ATT KODEN GÅR ATT REDIGERA FRÅN ETT STÄLLE (VG-NIVÅ - MÖJLIGTVIS DEN SVÅRASTE PUNKTEN I PROJEKTET (ELLER SÅ ÄR JAG BARA KORKAD))

  const monsterGallery = document.getElementById("monster-gallery-container");
  monsterGallery.innerHTML = "";

  const monsterGalleryHtmlArray = filteredMonsters.map((monster) => {
    const objectsWithValuesToPresentInHtml = [];
    count = 0;
    for (const element of editAbleSliderNames) {
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
        return `<p class="editableValue">${obj.attribute}: ${obj.value}`;
      })
      .join("");

    return `
        <div class="monsterCard">
          <div class="monsterInfo">
            <h2 class="monsterName">${monster.name}</h2>
            <p class="monsterType">Monster Type: ${monster.newMonsterDiet}</p>
            <p class="monsterColor">Monster Color: ${monster.monsterColor}</p>
            ${valuesToPresentInHtml}
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

function updateSliderValue(sliderId, valueId) {
  let slider = document.getElementById(sliderId);
  let valueDisplay = document.getElementById(valueId);

  if (!slider || !valueDisplay) {
    return;
  }
  valueDisplay.textContent = slider.value;

  slider.addEventListener("input", () => {
    valueDisplay.textContent = slider.value;
  });
}
