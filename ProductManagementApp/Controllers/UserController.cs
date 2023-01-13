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
    public class UserController : ControllerBase
    {
        private readonly ProductManagementDBContext _context;

        public UserController(ProductManagementDBContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<User>> Get()
            => await _context.Users.ToListAsync();


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var issue = await _context.Users.FindAsync(id);
            return issue == null ? NotFound() : Ok(issue);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
        }
    }
}
