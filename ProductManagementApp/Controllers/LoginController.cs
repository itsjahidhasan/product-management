using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using ProductManagementApp.Data;
using ProductManagementApp.Models;
using System.Data;
using System.Text;

namespace ProductManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public LoginController(IConfiguration configuration) => _configuration = configuration;

        [HttpPost()]
        public bool Login(UserLogin user)
        {
            SqlConnection conn = new SqlConnection(_configuration.GetConnectionString("SqlServer").ToString());
            SqlDataAdapter da = new SqlDataAdapter("select * from Users where Email='"+user.Email+"' and Password='"+user.Password+"'",conn);

            DataTable dt = new DataTable();
            da.Fill(dt);
            if(dt.Rows.Count > 0 )
            {
                return true;
            }
            else
            {
                return false;
            }
            
        }


    }
}
