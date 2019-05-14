using Microsoft.Azure.WebJobs.Hosting;
using Common;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Events;

[assembly: WebJobsStartup(typeof(LoggerApp.Startup))]
namespace LoggerApp
{
    public class Startup: IWebJobsStartup
    {
        public Startup()
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.Console()
                .WriteTo.ApplicationInsights(TelemetryConfiguration.Active, TelemetryConverter.Traces)
                .CreateLogger();
        }
        public void Configure(IWebJobsBuilder builder)
        {
            builder.Services.AddScoped<IService, Service>();
            builder.Services.AddLogging(loggingBuilder => { loggingBuilder.AddSerilog(dispose: true); });
            builder.Services.BuildServiceProvider(true);
        }
    }
}
