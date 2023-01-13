using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductManagementApp.Data;
using ProductManagementApp.Models;

namespace ProductManagementApp.Controllers
{
    [Route("private/")]
    [ApiController]
    [EnableCors]
    public class CatagoryController : Controller
    {
        
        private readonly ProductManagementDBContext _context;

        public CatagoryController(ProductManagementDBContext context) => _context = context;
        [HttpGet("category")]
        public async Task<IEnumerable<Catagory>> Get()
            => await _context.Products.ToListAsync();


        [HttpGet("category/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var issue = await _context.Products.FindAsync(id);
            return issue == null ? NotFound() : Ok(issue);
        }

        [HttpPost("category")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(Catagory product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = product.Id }, product);
        }
        


    }
}
