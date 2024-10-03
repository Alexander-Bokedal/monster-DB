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
// removeMonster (funktion inte gjord än)

// Det här är sökordet om man vill hitta saker att jobba med i koden
// VAD SOM BEHÖVER GÖRAS:

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  KOD FÖR ATT LÄGGA TILL MONSTER       /////////
//////  SÖKORD: addMonster                //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

const monsters = [
  {
    name: "Henke Penke",
    monsterType: "Strong",
    monsterHorns: 17,
    monsterLegs: 2,
    monsterEyes: 4,
    monsterTentacles: 10,
  },
  {
    name: "Boke Dale",
    monsterType: "Weak",
    monsterHorns: 5,
    monsterLegs: 2,
    monsterEyes: 2,
    monsterTentacles: 7,
  },
  {
    name: "Khani Bani",
    monsterType: "Strong",
    monsterHorns: 3,
    monsterLegs: 2,
    monsterEyes: 1,
    monsterTentacles: 17,
  },
  {
    name: "Denni Penni",
    monsterType: "Anime",
    monsterHorns: 6,
    monsterLegs: 2,
    monsterEyes: 4,
    monsterTentacles: 3,
  },
  {
    name: "Affe Baffe",
    monsterType: "Wow",
    monsterHorns: 6,
    monsterLegs: 2,
    monsterEyes: 4,
    monsterTentacles: 3,
  },
];

// Lista med förutbestämda monster
// Den här är till för att lättare kunna arbeta med innehållet på hemsidan
// Kommentera ut det här om du vill ha bort listan med monster
onload = () => {
  renderMonsters();
};

const doneButton = document.getElementById("done-button");

// KNAPP FÖR ATT LÄGGA TILL MONSTER I LISTAN
doneButton.addEventListener("click", () => {
  renderMonsters();
});

// FUNKTION FÖR ATT LÄGGA TILL MONSTER I LISTAN
const addMonsterToArray = () => {
  //SKAPA BEHÅLLARE MED INNEHÅLL FRÅN INPUTFORM!
  // VAD SOM BEHÖVER GÖRAS:
  // Se över denna kod så att den matchar inputform
  // Skapa kod som tillåter det här att redigeras på ett ställe (VG NIVÅ - MÖJLIGTVIS DEN SVÅRASTE PUNKTEN I HELA PROJEKTET (ELLER SÅ ÄR DET JAG SOM ÄR KORKAD))
  const monsterName = document.getElementById("monsterName").value;
  const monsterType = document.getElementById("monsterType").value;
  const monsterHorns = document.getElementById("monsterHorns").value;
  const monsterLegs = document.getElementById("monsterLegs").value;
  const monsterEyes = document.getElementById("monsterEyes").value;
  const monsterTentacles = document.getElementById("monsterTentacles").value;

  // SKAPA ETT MONSTER SOM ETT OBJEKT
  const newMonster = {
    name: monsterName,
    monsterType: monsterType,
    monsterHorns: monsterHorns,
    monsterLegs: monsterLegs,
    monsterEyes: monsterEyes,
    monsterTentacles: monsterTentacles,
  };

  // LÄGG TILL MONSTRET I VÅR ARRAY
  monsters.push(newMonster);
  // VAD SOM BEHÖVER GÖRAS:
  // EN FUNKTION FÖR ATT RENSA FORMULÄRET

  // FUNKTION FÖR ATT VISA MONSTER I LISTAN
  renderMonsters();
};

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

const renderMonsters = () => {
  // VAD SOM BEHÖVER GÖRAS:
  // ANPASSA SÅ ATT KODEN GÅR ATT REDIGERA FRÅN ETT STÄLLE (VG-NIVÅ - MÖJLIGTVIS DEN SVÅRASTE PUNKTEN I PROJEKTET (ELLER SÅ ÄR JAG BARA KORKAD))

  const monsterGallery = document.getElementById("monsterGallery");
  monsterGallery.innerHTML = "";

  const monsterGalleryHtmlArray = monsters.map((monster) => {
    return `
      <div class="monsterCard">
        <div class="monsterInfo">
          <h2 class="monsterName">${monster.name}</h2>
          <p class="monsterType">Monster Type: ${monster.monsterType}</p>
          <p class="monsterHorns">Horns: ${monster.monsterHorns}</p>
          <p class="monsterLegs">Legs: ${monster.monsterLegs}</p>
          <p class="monsterEyes">Eyes: ${monster.monsterEyes}</p>
        </div>
      </div>
    `;
  });
  monsterGallery.innerHTML = monsterGalleryHtmlArray.join("");

  // VAD SOM BEHÖVER GÖRAS:
  // SKAPA KNAPPAR PÅ ALLA MONSTER I LISTAN SOM GÖR ATT DE GÅR ATT TA BORT
  // DET ÄR MÖJLIIGT ATT EN SÅDAN FUNKTION GÅR ATT GÖRA DIREKT I OBJEKTET
  // BEHÖVER SE ÖVER DET OM VI VILL HA VG
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

let dietSelect = document.getElementById("monsterDietSelect");
let monsterDietTypes = [
  "🥩Flesh-Muncher",
  "🥬Leaf-Cruncher",
  "🗑️Non-Pesky-Omnivore",
];
const monsterTypeIcons = ["🥬", "🥩", "🗑️"];

for (let i = 0; i < monsterDietTypes.length; i++) {
  let choice = monsterDietTypes[i];

  let dropRows = document.createElement("option");
  dropRows.text = choice;
  dropRows.value = choice;
  dietSelect.appendChild(dropRows);
}

let typeSelect = document.getElementById("monsterTypeSelect");
let monsterTypes = ["Humanoid", "Fungal", "Titam", "Insectiod", "Troll"];

for (let i = 0; i < monsterTypes.length; i++) {
  let choice = monsterTypes[i];

  let dropRow = document.createElement("option");
  dropRow.text = choice;
  dropRow.value = choice;

  typeSelect.appendChild(dropRow);
}

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

//VAD SOM BEHÖVER GÖRAS:
// Skapa containers för checkboxes
// Kod som visar hur många av varje typ som finns. T.ex bredvid en checkbox som säger "röd" så ska det visas hur många röda det finns
// Lägg till eventListerners som kollar om checkbox är "checked"
// Skapa en funktion som skriver ut monster beroende på vilken checkbox som har "checked"

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
