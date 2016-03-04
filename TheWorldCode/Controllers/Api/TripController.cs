using Microsoft.AspNet.Mvc;
using Microsoft.Extensions.Logging;
using TheWorld.Models;
using TheWorld.ViewModels;
using System.Net;
using AutoMapper;
using System;
using System.Collections.Generic;

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
            var results = Mapper.Map<IEnumerable<TripViewModel>>(_repository.GetAllTripsWithStops());
            return Json(results);
        }
        
        [HttpPost("")]
        public JsonResult Post([FromBody]TripViewModel vm)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    var newTrip = Mapper.Map<Trip>(vm);
                    //Save to database
                    _logger.LogDebug("Attempting to save a new trip");
                    _repository.AddTrip(newTrip);
                    if(_repository.SaveAll())
                    {
                        Response.StatusCode = (int)HttpStatusCode.Created;         
                        return Json(Mapper.Map<TripViewModel>(newTrip));
                    }
                }
            }
            catch(Exception e)
            {
                _logger.LogError("Failed to save new trip", e);
                Response.StatusCode = (int)HttpStatusCode.BadRequest;
                return Json(new { Message = e.Message});
            }
            
            Response.StatusCode = (int)HttpStatusCode.BadRequest;
            return Json(new {Message = "Failed", ModelState = ModelState});
        }
    }
}