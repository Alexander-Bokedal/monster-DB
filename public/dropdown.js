// Dropdown funktion med olika parametrar som agerar som "placeholders" för olika värden
export function dropdown(selectElement, dataArray, textKey, valueKey) {
  /* For of loop som går igenom dataArray, skapar nytt element,
     sättre text och värden samt placerar den under sitt element */
  for (const item of dataArray) {
    const newOption = document.createElement("option");
    newOption.innerHTML = item[textKey];
    newOption.value = item[valueKey];
    selectElement.appendChild(newOption);
  }
}
