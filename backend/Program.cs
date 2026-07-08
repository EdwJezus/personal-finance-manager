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

// conexão com react
builder.Services.AddCors(options =>
{
    options.AddPolicy("React",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); 
    app.UseSwaggerUI(); 
}

app.UseHttpsRedirection();

app.UseCors("React");

app.MapControllers();

app.Run();