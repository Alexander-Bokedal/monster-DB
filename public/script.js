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

const doneButton = document.getElementById("done-button");

doneButton.addEventListener("click", () => {
  console.log("Done button clicked!");
  renderMonsters();
});

const addMonsterToArray = () => {
  const monsterName = document.getElementById("monsterName").value;
  const monsterType = document.getElementById("monsterType").value;
  const monsterHorns = document.getElementById("monsterHorns").value;
  const monsterLegs = document.getElementById("monsterLegs").value;
  const monsterEyes = document.getElementById("monsterEyes").value;
  const monsterTentacles = document.getElementById("monsterTentacles").value;

  const newMonster = {
    name: monsterName,
    monsterType: monsterType,
    monsterHorns: monsterHorns,
    monsterLegs: monsterLegs,
    monsterEyes: monsterEyes,
    monsterTentacles: monsterTentacles,
  };

  monsters.push(newMonster);
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

  console.log("hello world");
  monsterGallery.innerHTML = monsterGalleryHtmlArray.join("");
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
