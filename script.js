/*
    To use this script you need Tapermokey Chrome addon installed.
    Paste this code inside the Tapermonkeys' script editor and save it.
    This script lets you insert predefined prompts inside OpenAI Chat input.
    Inside keyMappings, you can define key mappings to predefined prompts.
    Prompts will be inserted inside the input box when you press the key
    combination: Alt + <key>
*/

const keyMappings = {
  x: "Remember the data that I gave you and reply only with 'ok.'",
  z: "I am working on a Django + GraphQL project.",
  e: "Locate any semantic/logic errors in the following code snippet:",
  a: "Analyze give code for code smells and suggest improvements:",
};

// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://chat.openai.com/chat*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        none
// ==/UserScript==
// select the <title> element

let textArea = null;

function setUpKeyBinds() {
  console.log("Setting up keymaps...");
  textArea = document.querySelector("textarea");
  textArea.addEventListener("keydown", handleKeyDown);
  const keyMapKeysStr = Object.keys(keyMappings).join(", ");
  textArea.placeholder = `${textArea.placeholder} (Keymaps: alt + ${keyMapKeysStr})`;
  console.log("Key Mappings:\n");
  // for loop
  for (let key in keyMappings) {
    console.log(`${key} : ${keyMappings[key]}`);
  }
}

function handleKeyDown(event) {
  console.log({ event });
  if (event.altKey && keyMappings[event.key]) {
    event.preventDefault();
    const mappedValue = keyMappings[event.key];
    console.log(`Keymapping "${event.key}": ${mappedValue}`);
    appendToTextArea(mappedValue);
  }
}

function appendToTextArea(input) {
  let text = "";
  if (textArea.value) {
    text = `${textArea.value}\n${input}`;
  } else {
    text = input;
  }
  text = text + "\n";
  textArea.value = text;
  // Make sure textArea is scrolled to bottom
  textArea.style.height = `${parseInt(textArea.style.height) + 24}px`;
  textArea.scrollTop = textArea.scrollHeight;
  textArea.focus();
}

function init() {
  console.log("Initializing...");

  // select the <title> element
  const title = document.querySelector("title");

  // create an observer instance
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      console.log(mutation.type); // logs the type of mutation (e.g. "attributes", "childList", "characterData")
      console.log(mutation.target); // logs the node that was mutated (in this case, the <title> element)
      console.log(mutation.oldValue); // logs the previous value of the mutated attribute or character data

      // Only run keybinding setup when the title has changed and the DOM is finished loading
      if (document.readyState === "complete") {
        setUpKeyBinds();
        console.log("Key Mappings:\n");
        console.log({ keyMappings });
      }
    });
  });

  // configuration of the observer:
  const config = {
    attributes: true,
    childList: true,
    characterData: true,
    attributeOldValue: true,
    characterDataOldValue: true,
  };

  // pass in the <title> element and the configuration to the observer
  observer.observe(title, config);
}

init();
