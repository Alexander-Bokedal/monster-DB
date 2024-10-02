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

  monsters.forEach((monster) => {
    const monsterGalleryHtml = `
    <div class="addForm">
      <div class="carInfo">
        <h2 class="carTitle">${monster.name}</h2>
        <p class="carYear">Year: ${monster.monsterType}</p>
        <p class="carMilage">Milage: ${monster.monsterHorns} KM</p>
        <p class="carPrice">Price: $${monster.monsterLegs}</p>
        <p class="carColor">Color: ${monster.monsterEyes}</p>
        
      </div>
      </div>
    `;
    monsterGallery.innerHTML += monsterGalleryHtml;
  });
  console.log(1);
};

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////  SLUT PÅ KOD KOD för att visa MONSTER  /////////
//////  SÖKORD: renderMonsters               //////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
