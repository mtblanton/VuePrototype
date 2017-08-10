using System;
using System.Collections;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace VuePrototype.Models
{
    public class GroupShellModel
    {
        public string GroupName { get; set; }
        public string TaxId { get; set; }
        public string GroupNumber { get; set; }
        public DateTime? CommencementDate { get; set; }

        public State? TaxState { get; set; }

        public bool PolicyStateSameAsTaxState { get; set; }

        public State? PolicyState { get; set; }
        public BluePartner BluePartner { get; set; }
        public IEnumerable<NameValuePair> BluePartnerOptions { get; set; }

        public string BCBSNumber { get; set; }
        public string IntegrationId { get; set; }
        public string SICCode { get; set; }

        public Address BenefitContactAddress { get; set; } = new Address();
        public Address OrganizationContactAddress { get; set; } = new Address();


        public IList<Subsidiary> Subsidiaries { get; set; } = new List<Subsidiary>();

        public IEnumerable<NameValuePair> States => GetStatesList();

        public IEnumerable<NameValuePair> GetStatesList()
        {
            var states = new List<NameValuePair>();
            foreach (var state in Enum.GetValues(typeof(State)))
            {
                states.Add(new NameValuePair
                {
                    Name = state.ToString(),
                    Value = state.ToString()
                });
            }

            return states;
        }

        public string JSONString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}