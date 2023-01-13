using System.ComponentModel.DataAnnotations;

namespace ProductManagementApp.Models
{
    public class Catagory
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public string Discription { get; set; }

    }
}
