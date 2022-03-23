using Microsoft.AspNetCore.SignalR;
using SignalR.Demo.Back.Hubs;
using SignalR.Demo.Back.Helpers;

namespace SignalR.Demo.Back.Jobs
{
    public class RugbyService : IHostedService
    {
        private static readonly string[] Clubs = { "France", "Angleterre", "Pays de Galles", "Italie", "Ecosse", "Irlande" };
        private readonly IHubContext<RugbyHub> hub;

        public RugbyService(IHubContext<RugbyHub> hub)
        {
            this.hub = hub;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            PeriodicHelper.SelectRandomElement(Clubs, club =>
            {
                this.hub.Clients.All.SendAsync("RugbyNationSent", club);
            });

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
