import * as signalR from "@microsoft/signalr";
import { toggleButtonState } from "./utils";

// Elements
const btToggle: HTMLButtonElement = document.querySelector("#btToggleRugbyHub");

// Events
btToggle.addEventListener("click", toggleConnectionState);

// Code
const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7187/rugbyhub")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Debug)
  .build();

connection.on("RugbyNationSent", (nation: string) => {
  document.querySelector("#divRugby").innerHTML = nation;
});

async function toggleConnectionState() {
  if (connection.state === signalR.HubConnectionState.Disconnected) {
    await connection.start();
  } else {
    await connection.stop();
  }

  toggleButtonState(this);
}
