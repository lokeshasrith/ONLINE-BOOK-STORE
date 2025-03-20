using System.ComponentModel.DataAnnotations;

namespace OnlineBookStore.Net.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required, MaxLength(50)]
        public string FirstName { get; set; }

        [Required, MaxLength(50)]
        public string LastName { get; set; }

        [Required, MaxLength(255)]
        public string Email { get; set; }

        [Required, MaxLength(255)]
        public string Password { get; set; }

        [Required, MaxLength(15)]
        public string CellNumber { get; set; }

    }
}
