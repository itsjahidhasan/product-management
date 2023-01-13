using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagementApp.Data;
using ProductManagementApp.Models;

namespace ProductManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class ProductDetailsController : ControllerBase
    {
        private readonly ProductManagementDBContext _context;

        public ProductDetailsController(ProductManagementDBContext context) => _context = context;
        [HttpGet]
        public async Task<IEnumerable<ProductDetail>> Get()
            => await _context.ProductDetails.ToListAsync();


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var issue = await _context.ProductDetails.FindAsync(id);
            return issue == null ? NotFound() : Ok(issue);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(ProductDetail detail)
        {
            
            await _context.ProductDetails.AddAsync(detail);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = detail.Id }, detail);
        }
    }
}
