using backend.Services;
using Microsoft.EntityFrameworkCore;
using backend.Contexts;

var builder = WebApplication.CreateBuilder(args);

// controllers
builder.Services.AddControllers();

// swagger
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen(); 

// entity framework
builder.Services.AddDbContext<TabelaContexto>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// services
builder.Services.AddScoped<PessoaService>();
builder.Services.AddScoped<TransacaoService>();
builder.Services.AddScoped<TotalService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); 
    app.UseSwaggerUI(); 
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();