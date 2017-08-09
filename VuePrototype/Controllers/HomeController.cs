using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using VuePrototype.Models;

namespace VuePrototype.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            var groupShellModel = new GroupShellModel
            {
                GroupName = "Taylor Test Group",
                BluePartnerOptions = new List<NameValuePair>
                {
                    new NameValuePair
                    {
                        Name = "",
                        Value = ""
                    },
                    new NameValuePair
                    {
                        Name = "Blue Cross Blue Shield of AR",
                        Value = "AR"
                    },
                    new NameValuePair
                    {
                        Name = "Blue Cross Blue Shield of FL",
                        Value = "FL"
                    }
                },
                Subsidiaries = new List<Subsidiary>
                {
                    new Subsidiary
                    {
                        Name = "Sub 1",
                        City = "Little Rock",
                        State = State.AR
                    }
                }
            };
            return View(groupShellModel);
        }
    }
}