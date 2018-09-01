console.log("test");
const divElement = document.getElementById("root");
console.log(divElement);

const nesto = divElement.attachShadow({mode: "open"});
console.log(nesto);

console.log(divElement.shadowRoot);
const inputEl = document.createElement("input");
inputEl.type = "range";
divElement.shadowRoot.appendChild(inputEl);


console.log(divElement.shadowRoot.activeElement);