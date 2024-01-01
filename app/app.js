const customSocket = io("ws://localhost:4000");

const sendMessage = (event) => {
  event.preventDefault();

  const inputElement = document.querySelector("input");
  if (inputElement.value.trim() !== "") {
    // Emit the message to the server
    customSocket.emit("message", inputElement.value.trim());
    inputElement.value = "";
  }

  inputElement.focus();
};

// Attach the sendMessage function to the form submission event
document.querySelector("form").addEventListener("submit", sendMessage);

// Listen for incoming messages from the server
customSocket.on("message", (receivedMessage) => {
  const messageListItem = document.createElement("li");
  messageListItem.textContent = receivedMessage;
  document.querySelector("ul").appendChild(messageListItem);
});
