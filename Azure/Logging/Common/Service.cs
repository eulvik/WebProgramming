using Microsoft.Extensions.Logging;

namespace Common
{
    public interface IService
    {
        void DoWork();
    }

    public class Service : IService
    {
        private readonly ILogger<Service> _logger;

        public Service(ILoggerFactory loggerFactory)
        {
            _logger = loggerFactory.CreateLogger<Service>();
        }

        public Service(ILogger<Service> logger)
        {
            _logger = logger;
        }

        public void DoWork()
        {
            _logger.LogInformation("Performing work!!!!!");
        }
    }
}
