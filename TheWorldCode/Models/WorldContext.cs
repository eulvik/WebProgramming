using System;
using Microsoft.Data.Entity;
using TheWorldCode;

namespace TheWorld.Models
{
    public class WorldContext : DbContext
    {
        public DbSet<Stop> Stops { get; set; }
        public DbSet<Trip> Trips { get; set; }
     
        public WorldContext()
        {
            Database.EnsureCreated();            
        }   
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connString = Startup.Configuration["Data:WorldContextConnection"];
            
            optionsBuilder.UseSqlite(connString);
            base.OnConfiguring(optionsBuilder);
        }
    }
}