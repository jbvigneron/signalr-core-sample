using Microsoft.AspNetCore.SignalR;

namespace SignalR.Demo.Back.Hubs
{
    public class ChatHub : Hub
    {
        public Task SendMessage(string user, string message)
        {
            return Clients.All.SendAsync("MessageReceived", user, message);
        }
    }
}
