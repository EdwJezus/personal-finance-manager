namespace backend.Program;
using backend.Models;
using backend.Services;
using backend.Contexts;
using Microsoft.EntityFrameworkCore;

public class Program()
{
    public static void Main(string[] args)
    {
        //builder.Services.AddDbContext<TabelaContexto>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

        var options = new DbContextOptionsBuilder<TabelaContexto>()
            .UseSqlite("Data Source=Database/finance.db")
            .Options;

        using TabelaContexto context = new TabelaContexto(options);

        PessoaService pessoaService = new PessoaService(context);
        TransacaoService transacaoService = new TransacaoService(context);
        TotalService totalService = new TotalService(context);


        pessoaService.CriarPessoa("Eduardo", 19);
        pessoaService.CriarPessoa("Pedro", 13);
        transacaoService.CriarTransacao("Coca Cola", 12.00, "DESPESA", 1);

        pessoaService.ListarPessoas();
        transacaoService.ListarTransacoes();
    }
}