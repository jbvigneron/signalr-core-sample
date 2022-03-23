import * as signalR from "@microsoft/signalr";
import { toggleButtonState } from "./utils";

// Elements
const btToggle: HTMLButtonElement = document.querySelector("#btToggleChatHub");
const divMessages: HTMLDivElement = document.querySelector("#divMessages");
const tbMessage: HTMLInputElement = document.querySelector("#tbMessage");
const btnSend: HTMLButtonElement = document.querySelector("#btnSend");

// Events
btToggle.addEventListener("click", toggleConnectionState);
btnSend.addEventListener("click", sendMessage);

// Code
const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7187/chathub")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Debug)
  .build();

connection.on("MessageReceived", (username: string, message: string) => {
  const m = document.createElement("div");
  m.innerHTML = `<span class="message-author">${username}</span>: ${message}`;

  divMessages.appendChild(m);
  divMessages.scrollTop = divMessages.scrollHeight;
});

async function toggleConnectionState() {
  if (connection.state === signalR.HubConnectionState.Disconnected) {
    await connection.start();
  } else {
    await connection.stop();
  }

  toggleButtonState(this);
}

const username = new Date().getTime().toString();

async function sendMessage() {
  await connection.invoke("SendMessage", username, tbMessage.value);
  tbMessage.value = "";
}
