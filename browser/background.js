console.log("asi es");
chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
    if (command == "open-h3-bookmark-manager") {
    }
});