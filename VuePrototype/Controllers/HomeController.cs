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
                TaxState = State.AR,
                PolicyState = State.AR,
                PolicyStateSameAsTaxState = true,
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
                },
                OrganizationContactAddress = new Address
                {
                    Line1 = "1 Fake Ln",
                    City = "Little Rock",
                    State = State.AR,
                    Zip = "72211"
                }
            };
            return View(groupShellModel);
        }

        [HttpPost]
        public JsonResult IsValidAddress(Address address)
        {
            var isValid = address.City == "Little Rock" && address.State == State.AR && address.Zip == "72211";
            return Json(isValid);
        }

        [HttpPost]
        public JsonResult SaveGroupShell(GroupShellModel model)
        {
            return Json(true);
        }
    }
}