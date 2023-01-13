using System.ComponentModel.DataAnnotations;

namespace ProductManagementApp.Models
{
    public class Product
    {
        public int Id { get; set; }
        [Required] public string Name { get; set; }

        [Required]
        public int PID { get; set; }
        [Required]
        public string Ram { get; set; }
        [Required]
        public string Rom { get; set; }
        public string Processor { get; set;}
        public string Price { get; set; }
        public string Quantity { get; set; }

       
    }
}
