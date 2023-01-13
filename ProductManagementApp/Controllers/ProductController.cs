using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagementApp.Data;
using ProductManagementApp.Models;

namespace ProductManagementApp.Controllers
{
    [Route("private/")]
    [ApiController]
    [EnableCors]
    public class ProductController : ControllerBase
    {
        private readonly ProductManagementDBContext _context;

        public ProductController(ProductManagementDBContext context) => _context = context;
        [HttpGet("product")]
        public async Task<IEnumerable<Product>> Get()
            => await _context.ProductDetails.ToListAsync();


        [HttpGet("product/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var issue = await _context.ProductDetails.FindAsync(id);
            return issue == null ? NotFound() : Ok(issue);
        }

        [HttpGet("category-product/{pid}")]
        public async Task<IEnumerable<Product>> GetByProductId(int pid)=> await _context.ProductDetails.Where(x => x.PID == pid).ToListAsync();


        [HttpPost("product")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(Product detail)
        {
            
            await _context.ProductDetails.AddAsync(detail);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = detail.Id }, detail);
        }
    }
}
