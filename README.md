# signalr-core-sample

A sample for ASP.NET SignalR Core usage

## Explainations

Contains 3 SignalR Hubs :

- ChatHub : a hub that allows users to chat between themselves
- RugbyHub : a simple hub that sends a 6-Nations Championship nation randomly to the client
- MoviesHubs : a hub that allows the user to subscribe to **groups** : Harry Potter movies or Lord of the Rings movies _(choose your side)_

## SignalR.Demo.Back

Contains the SignalR Core server, hubs and services.

Server is running on https://localhost:7187/

Command : **dotnet run**

## signalr-demo-front

Use this project to test subscription and unsubscription to SignalR Hubs.

Client is running on http://localhost:9000/

Command : **npx webpack serve**
