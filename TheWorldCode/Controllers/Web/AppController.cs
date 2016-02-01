
using Microsoft.AspNet.Mvc;
using TheWorld.Services;
using TheWorld.ViewModels;

namespace TheWorld.Controllers.Web
{
    public class AppController : Controller
    {
        private readonly IMailService _mailService;

        public AppController(IMailService service)
        {
            _mailService = service;
        }
        
        public IActionResult Index()
        {
            return View();
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
            _mailService.SendMail(
                "", "", 
                $"Contact Page from {contactViewModel.Name} ({contactViewModel.Email})", 
                contactViewModel.Message);
                
            return View();
        }
    }
}