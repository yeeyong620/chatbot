document.addEventListener("DOMContentLoaded", function () {
    const chatbox = document.getElementById("chatbox");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    function addMessage(sender, message, className) {
        let msgDiv = document.createElement("div");
        msgDiv.innerHTML = `<span class="${className}">${sender}: ${message}</span>`;
        chatbox.appendChild(msgDiv);
        chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to the latest message
    }

    function addBotMessage(message) {
        addMessage("Bot", message, "bot-message");
    }

    function addUserMessage(message) {
        addMessage("You", message, "user-message");
    }

    sendBtn.addEventListener("click", function () {
        let message = userInput.value.trim();
        if (message === "") return;

        addUserMessage(message);
        userInput.value = "";

        // Basic chatbot responses
        if (message.toLowerCase().includes("hello")) {
            addBotMessage("Hi there! How can I assist you?");
        } else if (message.toLowerCase().includes("bye")) {
            addBotMessage("Goodbye! Have a great day!");
        } else if (message.toLowerCase().includes("treatment")) {
            addBotMessage("Here are some treatments available:");

            // Create treatment buttons
            const buttons = [
                { text: "Scaling", response: "Clean teeth" },
                { text: "Filling", response: "Fill teeth" },
                { text: "Extraction", response: "Pull out teeth" }
            ];

            buttons.forEach(buttonInfo => {
                let button = document.createElement("button");
                button.innerText = buttonInfo.text;
                button.style.margin = "5px";
                button.onclick = function () {
                    addBotMessage(buttonInfo.response);
                };
                chatbox.appendChild(button);
            });
        } else {
            addBotMessage("I'm not sure how to respond to that.");
        }
    });
});

