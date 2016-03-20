using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using TheWorld.Models;
using TheWorld.ViewModels;
using System.Net;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using TheWorld.Services;
using System.Threading.Tasks;
using Microsoft.AspNet.Authorization;

namespace TheWorld.Controllers.Api
{
    [Authorize]
    [Route("api/trips/{tripName}/stops")]
    public class StopController : Controller
    {
        private readonly IWorldRepository _repository;
        ILogger<TripController> _logger;
        CoordService _coordService;

        public StopController(IWorldRepository repository, ILogger<TripController> logger, CoordService coordService)
        {
            _repository = repository;
            _logger = logger;
            _coordService = coordService;
        }
        
        [HttpGet("")]
        public JsonResult Get(string tripName)
        {
            try
            {
                var results = _repository.GetTripByName(tripName, User.Identity.Name);
                if(results == null)
                    return Json("No trip found");
                    
                return Json(Mapper.Map<IEnumerable<StopViewModel>>(results.Stops.OrderBy(s => s.Order)));
            }
            catch (Exception e)
            {
                _logger.LogError(@"Failed to get stops for trip {tripName}", e);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Error ocurrd finding trip name");
                
            }
        }
        
        [HttpPost("")]
        public async Task<JsonResult> Post(string tripName, [FromBody]StopViewModel vm)
        {
            try
            {
                _logger.LogInformation($"Perform post of stops with tripName:{tripName}");
                if(ModelState.IsValid)
                {
                    //Map to entity
                    var newStop = Mapper.Map<Stop>(vm);
                    //Looking op LatLon
                    _logger.LogInformation($"Looking up coordinates for {newStop.Name}");
                    var coordResult = await _coordService.Lookup(newStop.Name);
                    if(!coordResult.Success)
                    {
                        _logger.LogInformation($"Could not resolve coorindates {coordResult.Message}");
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(coordResult.Message);
                    }
                    newStop.Longitude = coordResult.Longitude;
                    newStop.Latitude = coordResult.Latitude;
                    
                    _logger.LogInformation("Saving to database");
                    //Save to database
                    _repository.AddStop(newStop, tripName, User.Identity.Name);
                    if(_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;
                        return Json(Mapper.Map<StopViewModel>(newStop));
                    }
                    _logger.LogInformation("SaveAll failed.");
                }
            }
            catch (Exception e)
            {
                _logger.LogError("Failed to save new stop", e);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json("Failed to save new stop");
            }
            
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new {Message = "Validation failed on new stop", ModelState = ModelState, ViewModelName = vm});
        }
    }

}