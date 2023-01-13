using System.ComponentModel.DataAnnotations;

namespace ProductManagementApp.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
    }
    public class UserLogin
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
