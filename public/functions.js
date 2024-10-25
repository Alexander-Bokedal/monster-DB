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

// Dropdown funktion med olika parametrar som agerar som "placeholders" för olika värden
export function monsterAttribute(selectElement, iconElement, attributeArray) {
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
