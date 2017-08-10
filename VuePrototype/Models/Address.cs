using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace VuePrototype.Models
{
    public class Address
    {
        public string Line1 { get; set; }
        public string Line2 { get; set; }
        public string Line3 { get; set; }
        public string City { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public State State { get; set; }
        public string Zip { get; set; }

    }
}