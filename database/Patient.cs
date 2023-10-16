using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace database
{
    public class Patient
    {
        [JsonIgnore]
        public int Id { get; set; }

        [JsonPropertyName("id")]
        public int IdAlternateGetter
        {
            get { return Id; }
        }
        public string Name { get; set; }
    }
}