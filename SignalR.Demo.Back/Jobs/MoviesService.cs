using Microsoft.AspNetCore.SignalR;
using SignalR.Demo.Back.Helpers;
using SignalR.Demo.Back.Hubs;

namespace SignalR.Demo.Back.Jobs
{
    public class MoviesService : IHostedService
    {
        private static readonly string[] HarryPotter = {
            "Harry Potter à l'école des sorciers",
            "Harry Potter et la chambre des secrets",
            "Harry Potter et le prisonnier d'Azkaban",
            "Harry Potter et la coupe de feu",
            "Harry Potter et l'ordre du phénix",
            "Harry Potter et le prince de sang-mélé",
            "Harry Potter et les reliques de la mort"
        };

        private static readonly string[] LordOfTheRings = {
            "La communauté de l'anneau",
            "Les deux tours",
            "Le retour du roi"
        };

        private readonly IHubContext<MoviesHub> hub;

        public MoviesService(IHubContext<MoviesHub> hub)
        {
            this.hub = hub;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            PeriodicHelper.SelectRandomElement(HarryPotter, movie =>
            {
                this.hub.Clients.Group("HarryPotter").SendAsync("NewMovieSent", movie);
            });

            PeriodicHelper.SelectRandomElement(LordOfTheRings, movie =>
            {
                this.hub.Clients.Group("LordOfTheRings").SendAsync("NewMovieSent", movie);
            });

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
