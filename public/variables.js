// Gör en array av val som vi kan ändra med sliders.
export const editableSliderNames = ["Tentacles", "Horns", "Eyes", "Legs"];
// Array med färger som går att ändra till valfria färger
// "name:" är det som kommer skrivas ut, "color:" är den faktiska färgen
// exempel "name: "White", color: "#fff""
// OBS EJ FUNKTIONELLT ÄN! BÅDA MÅSTE VARA T.EX "red" OCH "red" OBS
export const colors = [
  { name: "red", color: "#880808" },
  { name: "black", color: "black" },
  { name: "blue", color: "blue" },
  { name: "yellow", color: "yellow" },
  { name: "green", color: "green" },
];

// Skapa en array som innehåller olika typer av monsterdieter.
export const monsterDiets = [
  { icon: "🥩", diet: "🥩Flesh-Muncher", sound: "meat" },
  { icon: "🥬", diet: "🥬Leaf-Cruncher", sound: "leaf" },
  { icon: "🗑️", diet: "🗑️Non-Pesky-Omnivore", sound: "omni" },
];

export const monsterTypes = [
  { icon: "🐒", type: "🐒Humanoid", sound: "humanoids" },
  { icon: "🍄", type: "🍄Fungal", sound: "fungal" },
  { icon: "💥", type: "💥Titan", sound: "titan" },
  { icon: "🧟", type: "🧟Troll", sound: "shrek" },
];

export const monsterSizes = [
  { icon: "🤏", size: "🤏Pinky-Small", sound: "pinkysmall" },
  { icon: "🦒", size: "🦒Long-Legs", sound: "longlegs" },
  { icon: "🌋", size: "🌋Crippled-Mountain", sound: "crippledMountain" },
  { icon: "🌿", size: "🌿Tree-Twig", sound: "treeTwig" },
];

export const monsterImages = [
  "images/Blubberblitz.png",
  "images/Grumblefluff.png",
  "images/Snaggletooth.png",
  "images/Splatzo.png",
  "images/Octoflurf.png",
];

export const monsterIntros = {
  0: new Audio("sounds/blubberblitz.mp3"),
  1: new Audio("sounds/grumblefluff.mp3"),
  2: new Audio("sounds/snaggletooth.mp3"),
  3: new Audio("sounds/splatzo.mp3"),
  5: new Audio("sounds/octoflurf.mp3"),
};

// Random fraser som spelas vid "delete"
export const randomDeleteSounds = [
  new Audio("sounds/Bye.mp3"),
  new Audio("sounds/Service.mp3"),
  new Audio("sounds/BringBack.mp3"),
  new Audio("sounds/NoMiss.mp3"),
];

// Samla alla effektljud i obj.
export const effectSounds = {
  //Settings
  changeMonster: new Audio("sounds/changeMonster.mp3"),
  dropDown: new Audio("sounds/dropDown.mp3"),
  changeValue: new Audio("sounds/changeValue.mp3"),
  changeColor: new Audio("sounds/changeColor.mp3"),
  //Colors
  red: new Audio("sounds/Red.mp3"),
  black: new Audio("sounds/Black.mp3"),
  yellow: new Audio("sounds/Yellow.mp3"),
  blue: new Audio("sounds/Blue.mp3"),
  green: new Audio("sounds/Green.mp3"),
  // Diets
  meat: new Audio("sounds/Meat.mp3"),
  leaf: new Audio("sounds/Leafs.mp3"),
  omni: new Audio("sounds/Omni.mp3"),
  //Sizes
  pinkysmall: new Audio("sounds/pinky-small.mp3"),
  longlegs: new Audio("sounds/LongLegs.mp3"),
  crippledMountain: new Audio("sounds/CrippledMountain.mp3"),
  treeTwig: new Audio("sounds/TreeTwig.mp3"),
  //Types
  humanoids: new Audio("sounds/Humanoids.mp3"),
  fungal: new Audio("sounds/Fungal.mp3"),
  titan: new Audio("sounds/Titan.mp3"),
  shrek: new Audio("sounds/Troll.mp3"),
};

export const backgroundMusic = new Audio("sounds/bgMusic.mp3");

export const soundmutemode = ["images/mute.png", "images/sound.png"];

export const darkmodeImgArray = ["images/darkmode.png", "images/lightmode.png"];

export const randomNames = [
  "Aldorin",
  "Braknor",
  "Kyronis",
  "Varnell",
  "Elsera",
  "Jorvash",
  "Falkor",
  "Miradel",
  "Zantor",
  "Thandor",
  "Balgrim",
  "Drexis",
  "Lothar",
  "Krynor",
  "Zephyr",
  "Ulrick",
  "Morvyn",
  "Felmar",
  "Grithor",
  "Aerwyn",
  "Ylthar",
  "Karvox",
  "Theron",
  "Valros",
  "Quorin",
  "Galdar",
  "Tyrion",
  "Xandor",
  "Maelis",
  "Orlinn",
  "Fendrel",
  "Zarek",
  "Pyrros",
  "Iralith",
  "Vuldar",
  "Tarvin",
  "Brinok",
  "Esthar",
  "Garrok",
  "Lintra",
  "Norrin",
  "Zelmar",
  "Myraen",
  "Talfir",
  "Zyndra",
  "Havrik",
  "Silnor",
  "Eldric",
  "Kynath",
  "Verlis",
  "Rythek",
  "Ordrik",
  "Velmar",
  "Lirael",
  "Tanwen",
  "Droven",
  "Arvorn",
  "Caldyn",
  "Thalor",
  "Sylros",
  "Kyrell",
  "Nymira",
  "Virel",
  "Wynric",
  "Zalros",
  "Krylor",
  "Darven",
  "Voryn",
  "Galeth",
  "Tarvos",
  "Fenric",
  "Zyleen",
  "Orvath",
  "Eranor",
  "Jorwyn",
  "Thalyn",
  "Xarros",
  "Marden",
  "Fendral",
  "Vexnor",
  "Ygrath",
  "Lareth",
  "Zandro",
  "Mordek",
  "Valryn",
  "Kelvor",
  "Xyphor",
  "Eldara",
  "Cyrwen",
  "Radorn",
  "Ylvara",
  "Kalthor",
  "Malros",
  "Jynrae",
  "Tharak",
  "Noldor",
  "Relnor",
  "Grivor",
  "Zyriss",
  "Dalvik",
];
