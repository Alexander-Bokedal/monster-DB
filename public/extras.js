// Darkmode funktion med olika parametrar som agerar som "placeholders" för olika värden
export function darkmode(themeSwitch, darkmodeImgArray) {
  // Deklarerar en variable och hämtar ett värde i det lokala minnet och ger den nyckeln "darkmode"
  let darkmode = localStorage.getItem("darkmode");

  // Deklarerar variabler och skapar elementen img under dem
  const lightImg = document.createElement("img");
  const darkImg = document.createElement("img");

  // Deklarerar att variablen ska anta samma värden som index 0/1 i darkmodeImgArray arrayen
  lightImg.src = darkmodeImgArray[0];
  darkImg.src = darkmodeImgArray[1];

  // Variablerna med bilder tilldelas en plats i dommen under knappen themeswitch
  themeSwitch.appendChild(darkImg);
  themeSwitch.appendChild(lightImg);

  // En darkmode funktion som lägger till "darkmode" som en class så den går att styla
  const enableDarkmode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkmode", "active");
  };
  // En lightmode fuktion som tar bort "darkmode" som en class. Också för styling
  const disableDarkmode = () => {
    document.body.classList.remove("darkmode");
    localStorage.setItem("darkmode", null);
  };

  // Om darkmode var på tidigare, ha kvar det på. Om det inte var på, sätt inte på det.
  if (darkmode === "active") {
    enableDarkmode();
  }

  // När man klickar på "themeswitch" knappen så byter den mode
  themeSwitch.addEventListener("click", () => {
    darkmode = localStorage.getItem("darkmode");
    if (darkmode === "active") {
      disableDarkmode();
    } else {
      enableDarkmode();
    }
  });
}

// Mutemode funktion med olika parametrar som agerar som "placeholders" för olika värden
export function mutemode(muteSwitch, soundmodeImgArray, backgroundMusic) {
  let isMuted = true;
  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.1;

  // Deklarerar variabler och skapar elementen img under dem
  const muteImg = document.createElement("img");
  const soundImg = document.createElement("img");

  // Deklarerar att variablen ska anta samma värden som index 0/1 i soundmodeImgArray arrayen
  muteImg.src = soundmodeImgArray[0];
  soundImg.src = soundmodeImgArray[1];

  // Variablerna med bilder tilldelas en plats i dommen under knappen muteSwitch
  muteSwitch.appendChild(muteImg);
  muteSwitch.appendChild(soundImg);

  // När man klickar på "muteSwitch" knappen så byter den mode och musiken spelar eller stängs av
  muteSwitch.addEventListener("click", () => {
    if (isMuted) {
      backgroundMusic.muted = false;
      backgroundMusic.play();
      document.body.classList.add("mutemode");
    } else {
      backgroundMusic.muted = true;
      backgroundMusic.pause();
      document.body.classList.remove("mutemode");
    }
    isMuted = !isMuted;
  });
}
