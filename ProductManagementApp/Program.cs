using Microsoft.EntityFrameworkCore;
using ProductManagementApp.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:3000").WithHeaders("content-type").AllowCredentials());
});

builder.Services.AddDbContext<ProductManagementDBContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseRouting();
//Enable Authentication
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("AllowSpecificOrigin");

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
