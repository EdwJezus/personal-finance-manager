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

        PessoaService pessoaService = new PessoaService();
        TransacaoService transacaoService = new TransacaoService();
        TotalService totalService = new TotalService();

        pessoaService.CriarPessoa(1, "eduardo", 13);
        pessoaService.CriarPessoa(2, "pedro", 18);

        transacaoService.CriarTransacao(1, "Coca-cola", 12.00, "DESPESA", 1);
        transacaoService.CriarTransacao(2, "Pepsi", 16.00, "RECEITA", 2);
        transacaoService.CriarTransacao(3, "Ruffles", 15.00, "RECEITA", 1);
        transacaoService.CriarTransacao(4, "Cheetos", 5.00, "DESPESA", 2);

        Console.WriteLine(">>>>>>>>Lista Pessoas:");
        pessoaService.ListarPessoas();

        Console.WriteLine(">>>>>>>>Listar Transações:");
        transacaoService.ListarTransacoes();

        totalService.ListarValoresTotais();

        Console.WriteLine("\n-pessoa deletada");
        pessoaService.DeletarPessoa(2);
        pessoaService.ListarPessoas();

        transacaoService.ListarTransacoes();
    }  
}