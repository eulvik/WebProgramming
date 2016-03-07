using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.Entity;
using Microsoft.Extensions.Logging;

namespace TheWorld.Models
{
    public class WorldRepository : IWorldRepository
    {
        private readonly WorldContext _context;
        ILogger<WorldRepository> _logger;

        public WorldRepository(WorldContext context, ILogger<WorldRepository> logger)
        {
            _context = context;
            _logger = logger;
        }

        public void AddStop(Stop newStop, string tripName, string userName)
        {
            var theTrip = GetTripByName(tripName, userName);
            newStop.Order = theTrip.Stops.Max(s => s.Order) + 1;
            theTrip.Stops.Add(newStop);
            _context.Add(newStop);
        }

        public void AddTrip(Trip newTrip)
        {
            _context.Add(newTrip);
        }

        public IEnumerable<Trip> GetAllTrips()
        {
            try
            {
            return _context.Trips.OrderBy(t => t.Name).ToList();
            }
            catch(Exception e)
            {
                _logger.LogError("Could not get trips from database", e);
                return null;
            }
        }   
        
        public IEnumerable<Trip> GetAllTripsWithStops()
        {
            try
            {
                return _context.Trips.Include(t => t.Stops).OrderBy(t => t.Name).ToList();
            }
            catch(Exception e)
            {
                _logger.LogError("Could not get trips with stops from database", e);
                return null;
            }
        }

        public Trip GetTripByName(string tripName, string userName)
        {
            _logger.LogInformation($"Looking up trip with name {tripName}");
            return _context.Trips.Include(t => t.Stops).Where(t => t.Name == tripName && t.UserName == userName).FirstOrDefault();
        }

        public IEnumerable<Trip> GetUserTripsWithStops(string name)
        {
            try
            {
                return _context.Trips
                    .Include(t => t.Stops)
                    .OrderBy(t => t.Name)
                    .Where(t => t.UserName == name)
                    .ToList();
            }
            catch(Exception e)
            {
                _logger.LogError("Could not get trips with stops from database", e);
                return null;
            }
            
        }

        public bool SaveAll()
        {
            int changes = _context.SaveChanges();
            _logger.LogInformation($"Saved {changes} changes");
            return changes > 0;
        }
    }
}