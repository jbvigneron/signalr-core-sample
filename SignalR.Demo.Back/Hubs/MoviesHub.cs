using Microsoft.AspNetCore.SignalR;

namespace SignalR.Demo.Back.Hubs
{
    public class MoviesHub : Hub
    {
        public Task Subscribe(string groupName)
        {
            return this.Groups.AddToGroupAsync(this.Context.ConnectionId, groupName);
        }

        public Task Unsubscribe(string groupName)
        {
            return this.Groups.RemoveFromGroupAsync(this.Context.ConnectionId, groupName);
        }
    }
}
