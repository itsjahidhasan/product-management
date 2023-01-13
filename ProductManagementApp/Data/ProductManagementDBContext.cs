using Microsoft.EntityFrameworkCore;
using ProductManagementApp.Models;

namespace ProductManagementApp.Data
{
    public class ProductManagementDBContext: DbContext
    {
        public ProductManagementDBContext(DbContextOptions<ProductManagementDBContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<Catagory> Products { get; set; }
        public DbSet<Product> ProductDetails { get; set; }


    }
}
