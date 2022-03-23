export function toggleButtonState(button: HTMLButtonElement) {
  if (button.innerHTML.includes("OFF")) {
    button.classList.remove("btn-danger");
    button.classList.add("btn-success");
    button.innerHTML = "ON";
  } else {
    button.classList.remove("btn-success");
    button.classList.add("btn-danger");
    button.innerHTML = "OFF";
  }
}
