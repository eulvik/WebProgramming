
using Microsoft.AspNet.Mvc;
using TheWorld.Services;
using TheWorld.ViewModels;
using TheWorldCode;
using TheWorld.Models;
using System.Linq;
using System;
using Microsoft.AspNet.Authorization;

namespace TheWorld.Controllers.Web
{
    public class AppController : Controller
    {
        private readonly IMailService _mailService;
        private readonly IWorldRepository _repository;

        public AppController(IMailService service, IWorldRepository repository)
        {
            _mailService = service;
            _repository = repository;
        }
        
        public IActionResult Index()
        {
            return View();
        }
        
        [Authorize]
        public IActionResult Trips()
        {
            var trips = _repository.GetAllTrips();
            return View(trips);   
        }
        
        public IActionResult About()
        {
            return View();
        }
        
        public IActionResult Contact()
        {
            return View();
        }
        
        [HttpPost]
        public IActionResult Contact(ContactViewModel contactViewModel)
        {
            if(ModelState.IsValid)
            {
                var email = Startup.Configuration["AppSettings:SiteEmailAddress"];
                
                if(string.IsNullOrWhiteSpace(email))
                {
                    ModelState.AddModelError("", "Could not send email. Configuration problem");
                }
                
                if(_mailService.SendMail(
                    email, email, 
                    $"Contact Page from {contactViewModel.Name} ({contactViewModel.Email})", 
                    contactViewModel.Message))
                    {
                        ModelState.Clear();
                        
                        ViewBag.Message = "Mail Sent. Thanks";
                    }
            } 
            
            return View();
        }
    }
}