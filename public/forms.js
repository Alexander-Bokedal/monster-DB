// En funtion som formaterar om den första bokstaven i meningen och gör den till storbokstav
export const formatText = (string) => {
  // Deklarerar en variable som en tom sträng
  let formattedText = "";
  // Deklarerar en variable som en sträng som är litebokstav
  let lowerCaseString = string.toLowerCase();
  // Deklarerar en variable som tar vår tidigare variable och delar upp den till en array
  const splitArray = lowerCaseString.split(" ");
  // Loop itererar över varje element (ord) i arrayen
  for (const element of splitArray) {
    // För varje element (ord) i arrayen blir index 0 stor bokstav, fr o m index [1] splice
    formattedText += element.charAt(0).toUpperCase() + element.slice(1) + " ";
  }
  // Ta bort whitespace från slutet av ordet och returna
  return formattedText.trimEnd();
};
