# OpenAI Chat KeyMaps Script

This script lets you insert predefined prompts into the OpenAI Chat input using a keyboard shortcut. To use it, install Tampermonkey on Chrome (or some other extension that lets you execute javascript on predefined pages) and follow these steps:

1. Open the OpenAI Chat webpage and select "Create new script" option from the Tampermonkey extension menu.
2. Paste the script inside the text editor.
3. Define your prompts in the `keyMappings` section by specifying the key combination and the prompt.
4. Press Alt+<key> to insert a prompt into the chat input box.

## Notes

- Use keycodes instead of special characters (@, $, etc.).
- Save the script after making changes.
