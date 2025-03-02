export function createToggleElement(index) {
  const divRow = document.createElement("div");
  divRow.classList.add("row");

  const divSwitch = document.createElement("div");
  divSwitch.classList.add("switch");

  const inputs = [
      { id: `switch-${index}-y`, name: `tripple-${index}`, value: "Y", label: "Sentence", checked: true },
      { id: `switch-${index}-i`, name: `tripple-${index}`, value: "I", label: "Word", checked: false },
      { id: `switch-${index}-n`, name: `tripple-${index}`, value: "N", label: "Letter", checked: false }
  ];

  inputs.forEach(inputData => {
      const input = document.createElement("input");
      input.id = inputData.id;
      input.name = inputData.name;
      input.type = "radio";
      input.value = inputData.value;
      input.classList.add("switch-input");
      if (inputData.checked) input.checked = true;

      const label = document.createElement("label");
      label.htmlFor = inputData.id;
      label.classList.add("switch-label", `switch-label-${inputData.value.toLowerCase()}`);
      label.textContent = inputData.label;

      divSwitch.appendChild(input);
      divSwitch.appendChild(label);
  });

  const spanSelector = document.createElement("span");
  spanSelector.classList.add("switch-selector");

  divSwitch.appendChild(spanSelector);
  divRow.appendChild(divSwitch);

  return divRow;
}

  
 