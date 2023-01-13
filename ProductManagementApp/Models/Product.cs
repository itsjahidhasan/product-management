using System.ComponentModel.DataAnnotations;

namespace ProductManagementApp.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Model { get; set; }

    }
}
