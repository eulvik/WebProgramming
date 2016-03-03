using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using TheWorld.Models;
using TheWorld.ViewModels;
using System.Net;

namespace TheWorld.Controllers.Api
{
    [Route("api/trips")]
    public class TripController : Controller
    {
        private readonly IWorldRepository _repository;
        ILogger<TripController> _logger;

        public TripController(IWorldRepository repository, ILogger<TripController> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        
        [HttpGet("")]
        public JsonResult Get()
        {
            var results = _repository.GetAllTripsWithStops();
            return Json(results);
        }
        
        [HttpPost("")]
        public JsonResult Post([FromBody]TripViewModel newTrip)
        {
            if(newTrip == null)
            {
                _logger.LogError("newTrip is null");
                return Json(false);
            }
            else
                _logger.LogDebug($"Got a trip with name: {newTrip.Name}");
            
            if(ModelState.IsValid)
            {
                Response.StatusCode = (int)HttpStatusCode.Created;         
                return Json(true);
            }
            
            
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new {Message = "Failed", ModelState = ModelState});
        }
    }
}