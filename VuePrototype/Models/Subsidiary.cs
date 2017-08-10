using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace VuePrototype.Models
{
    public class Subsidiary
    {
        public virtual string EmployerNumber { get; set; }
        [MaxLength(120)]
        public virtual string Name { get; set; }
        public virtual string TaxId { get; set; }

        public virtual string City { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public virtual State State { get; set; }
    }
}