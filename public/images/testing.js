const colors = [
  { name: "Red", color: "red" },
  { name: "Black", color: "black" },
  { name: "Blue", color: "blue" },
  { name: "Yellow", color: "yellow" },
  { name: "Green", color: "green" },
];

const colorsHtml = colors.map(
  (color) =>
    `<button class="color-box" id="${color.name}" style="background-color: ${color.color};"></button>`
);

const colorsNames = colors.map((color) => color.name);

let colorSelection = null;

const colorsToChooseFrom = document.querySelector("#colors-main");
const updateColors = () => {
  colorsToChooseFrom.innerHTML = colorsHtml.join("");
  const colorDivs = document.querySelectorAll(".color-box");

  colorDivs.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      colorSelection = button.style.backgroundColor;
      let colorName = button.id;
      document.querySelector(
        ".show-color-selection"
      ).innerHTML = `<div class="show-color-selection" style="background-color: ${colorSelection}"></div>`;
      console.log(colorSelection);
    });
  });
};

const updateColorFilters = () => {
  const colorFilters = document.querySelector(".color-filters");
  const colorFiltersHtml = colors.map((color) => {
    return `<input type="checkbox" class="color-to-filter-by" id="${color.color}" name="${color.color}" />
    <label for="${color.name}">${color.name}</label>`;
  });

  colorFilters.innerHTML = colorFiltersHtml.join("");

  const colorFilterDivs = document.querySelectorAll(".color-to-filter-by");

  colorFilterDivs.forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        activeFilters.colors.push(checkbox.id);
        console.log(activeFilters.colors);
      } else {
        activeFilters.colors = activeFilters.colors.filter(
          (filter) => filter !== checkbox.id
        );
        console.log(activeFilters.colors);
      }

      applyFilter();
    });
  });
};
