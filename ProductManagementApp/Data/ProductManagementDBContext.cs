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
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductDetail> ProductDetails { get; set; }


    }
}
