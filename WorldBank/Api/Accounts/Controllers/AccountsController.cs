using Microsoft.AspNet.Mvc;
using System;

namespace Accounts.Controllers
{
    [Route("api/accounts")]
    class AccountsController : Controller
    {
        [HttpGet]
        public JsonResult Test()
        {
            Console.WriteLine("Test called");
            return Json("true");
        }
    }
}