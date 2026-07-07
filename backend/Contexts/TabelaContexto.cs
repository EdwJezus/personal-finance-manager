using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Contexts
{
    public class TabelaContexto : DbContext
    {
        public TabelaContexto(DbContextOptions<TabelaContexto>options) : base(options)
        {
            

        }

        public DbSet<Pessoa> Pessoas {get; set;}
        public DbSet<Transacao> Transacoes {get; set;}
    }
}