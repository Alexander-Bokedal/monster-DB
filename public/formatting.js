export const formatText = (string) => {
  let formattedText = "";
  let lowerCaseString = string.toLowerCase();
  // Skap tom "" variabel för den omgjorda strängen
  const splitArray = lowerCaseString.split(" ");
  // Funktionen split(" ") används för att dela upp den ursprungliga strängen i en array av ord
  for (const element of splitArray) {
    // Loop itererar över varje element (ord) i arrayen
    formattedText += element.charAt(0).toUpperCase() + element.slice(1) + " ";
    // För varje element (ord) i arrayen blir index 0 stor bokstav, fr o m index [1] splice
  }
  return formattedText.trimEnd();
  // Ta bort whitespace från slutet av ordet och returna
};
