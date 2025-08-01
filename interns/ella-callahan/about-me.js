// Get references to HTML elements
// These lines will now correctly find the elements because the script is loaded after the HTML
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Define information about "Ella" (the user this chatbot is about)
const userInfo = {
    name: "Ella",
    occupation: "High School Intern",
    hobbies: "soccer, basketball, DECA, architecture legos ",
    favoriteColor: "blue",
    location: "Melrose, MA",
    age: "17",
    pet: "a dog named Lulu"
};

// Chat history to maintain context for the AI model
let chatHistory = [];

// Function to add a message to the chat display
function addMessage(message, sender) {
    const msgDiv = document.createElement('div');
    // Add classes for styling: 'user-message' or 'bot-message'
    msgDiv.classList.add('message', `${sender}-message`);
    msgDiv.textContent = message;
    chatMessages.appendChild(msgDiv);
    // Scroll to the bottom to show the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to simulate bot typing
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'typing-indicator');
    typingDiv.textContent = 'Typing...';
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingDiv; // Return the element so we can remove/update it later
}

// Function to remove the typing indicator
function removeTypingIndicator(indicatorElement) {
    if (indicatorElement && indicatorElement.parentNode) {
        indicatorElement.parentNode.removeChild(indicatorElement);
    }
}

// Function to get the bot's response
async function getBotResponse(userMessage) {
    const lowerCaseMessage = userMessage.toLowerCase();
    let botReply = "";
    let handledByRules = false;

    // --- Rule-based responses for specific "Ella" info ---
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
        botReply = "Hello there! How can I help you?";
        handledByRules = true;
    } else if (lowerCaseMessage.includes("ella's name") || lowerCaseMessage.includes("who is ella")) {
        botReply = `Ella's name is ${userInfo.name}.`;
        handledByRules = true;
    } else if (lowerCaseMessage.includes("ella's occupation") || lowerCaseMessage.includes("ella's job") || lowerCaseMessage.includes("ella's work")) {
        botReply = `Ella works as a ${userInfo.occupation}.`;
        handledByRules = true;
    } else if (lowerCaseMessage.includes("ella's hobbies") || lowerCaseMessage.includes("what does ella do for fun")) {
        botReply = `Ella's hobbies include ${userInfo.hobbies}.`;
        handledByRules = true;
    } else if (lowerCaseMessage.includes("ella's favorite color") || lowerCaseMessage.includes("ella's favourite colour")) {
        botReply = `Ella's favorite color is ${userInfo.favoriteColor}.`;
        handledByRules = true;
    } else if (lowerCaseMessage.includes("where is ella") || lowerCaseMessage.includes("ella's location")) {
        botReply = `Ella is currently in ${userInfo.location}.`;
        handledByRules = true;
    } else if (lowerCaseMessage.includes("how old is ella") || lowerCaseMessage.includes("ella's age")) {
        botReply = `Ella is ${userInfo.age} years old.`;
        handledByRules = true;
    } else if (lowerCaseMessage.includes("ella's pet") || lowerCaseMessage.includes("what animal does ella have")) {
        botReply = `Ella has ${userInfo.pet}.`;
        handledByRules = true;
    } else if (lowerCaseMessage.includes("thank you") || lowerCaseMessage.includes("thanks")) {
        botReply = "You're welcome! Is there anything else you'd like to know?";
        handledByRules = true;
    } else if (lowerCaseMessage.includes("bye") || lowerCaseMessage.includes("goodbye")) {
        botReply = "Goodbye! Have a great day!";
        handledByRules = true;
    }

    // --- AI Model (Gemini API) for general questions ---
    if (!handledByRules) {
        const typingIndicator = showTypingIndicator();
        try {
            // Add user message to chat history for context
            chatHistory.push({ role: "user", parts: [{ text: userMessage }] });

            const payload = {
                contents: chatHistory
            };
            const apiKey = ""; // Canvas will automatically provide the API key at runtime
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            // Exponential backoff for API calls (basic implementation)
            let response;
            let retries = 0;
            const maxRetries = 3;
            const baseDelay = 1000; // 1 second

            while (retries < maxRetries) {
                try {
                    response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (response.ok) {
                        break; // Success, exit loop
                    } else if (response.status === 429) { // Too Many Requests
                        const delay = baseDelay * Math.pow(2, retries);
                        console.warn(`Rate limit hit. Retrying in ${delay / 1000} seconds...`);
                        await new Promise(resolve => setTimeout(resolve, delay));
                        retries++;
                    } else {
                        throw new Error(`API error: ${response.status} ${response.statusText}`);
                    }
                } catch (fetchError) {
                    console.error("Fetch error:", fetchError);
                    if (retries === maxRetries - 1) { // Last retry failed
                        throw fetchError;
                    }
                    const delay = baseDelay * Math.pow(2, retries);
                    console.warn(`Network error. Retrying in ${delay / 1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, delay));
                    retries++;
                }
            }

            if (!response || !response.ok) {
                throw new Error("Failed to get response from AI after multiple retries.");
            }

            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 &&
                result.candidates[0].content && result.candidates[0].content.parts &&
                result.candidates[0].content.parts.length > 0) {
                botReply = result.candidates[0].content.parts[0].text;
                // Add bot response to chat history
                chatHistory.push({ role: "model", parts: [{ text: botReply }] });
            } else {
                botReply = "I couldn't generate a response. The AI might be having trouble.";
                console.error("Unexpected AI response structure:", result);
            }
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            botReply = "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later.";
        } finally {
            removeTypingIndicator(typingIndicator);
        }
    }

    // Display the bot's response (either rule-based or AI-generated)
    addMessage(botReply, 'bot');
}

// --- Event Listeners and Initialization ---
// These event listeners are now directly attached to the elements
// because the script is loaded after the HTML, ensuring elements exist.
sendButton.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) { // Only send if the input is not empty
        addMessage(message, 'user');
        userInput.value = ''; // Clear the input field
        getBotResponse(message);
    }
});

userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendButton.click(); // Trigger the send button's click event
    }
});

// Focus on the input field when the page loads
window.onload = () => {
    userInput.focus();
};
