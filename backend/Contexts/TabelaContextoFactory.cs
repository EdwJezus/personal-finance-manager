using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace backend.Contexts;

public class TabelaContextoFactory : IDesignTimeDbContextFactory<TabelaContexto>
{
    public TabelaContexto CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<TabelaContexto>();

        optionsBuilder.UseSqlite("Data Source=Database/finance.db");

        return new TabelaContexto(optionsBuilder.Options);
    }
}