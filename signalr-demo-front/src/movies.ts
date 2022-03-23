import * as signalR from "@microsoft/signalr";
import { toggleButtonState } from "./utils";

// Elements
const btToggle: HTMLButtonElement =
  document.querySelector("#btToggleMoviesHub");
const ulMovies: HTMLDivElement = document.querySelector("#ulMovies");

const cbHP: HTMLInputElement = document.querySelector("#cbHP");
const cbLOTR: HTMLInputElement = document.querySelector("#cbLOTR");

// Events
btToggle.addEventListener("click", toggleConnectionState);
cbHP.addEventListener("click", toggleSubscribe);
cbLOTR.addEventListener("click", toggleSubscribe);

// Code
const connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:7187/movieshub")
  .withAutomaticReconnect()
  .configureLogging(signalR.LogLevel.Debug)
  .build();

connection.on("NewMovieSent", (movie: string) => {
  const li = document.createElement("li");
  li.innerHTML = movie;
  ulMovies.appendChild(li);
});

async function toggleConnectionState() {
  if (connection.state === signalR.HubConnectionState.Disconnected) {
    await connection.start();
  } else {
    await connection.stop();
  }

  toggleButtonState(this);
}

function toggleSubscribe() {
  if (this.checked) {
    connection.invoke("Subscribe", this.value);
  } else {
    connection.invoke("Unsubscribe", this.value);
  }
}
