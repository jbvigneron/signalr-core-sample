namespace SignalR.Demo.Back.Helpers
{
    public static class PeriodicHelper
    {
        public static void SelectRandomElement(string[] input, Action<string> onSelectedCallback)
        {
            var timer = new System.Timers.Timer();
            timer.Interval = new Random().Next(2000, 5000); // Between 2 and 5 seconds

            timer.Elapsed += (s, e) =>
            {
                var item = SelectRandomItem(input);
                onSelectedCallback(item);
            };

            timer.Start();
        }

        private static string SelectRandomItem(string[] inputs)
        {
            var index = new Random().Next(inputs.Length);
            return inputs[index];
        }
    }
}
