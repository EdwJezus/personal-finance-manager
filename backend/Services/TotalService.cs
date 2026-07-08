namespace backend.Services;
using backend.Models;
using backend.Contexts;

public class TotalService
{
    private readonly TabelaContexto _context;
    public TotalService(TabelaContexto context)
    {
        _context = context;
    }

    public void ListarValoresTotais()
    {
        double total_receitas = 0.00;
        double total_despesas = 0.00;

        Console.WriteLine("=======================================");
        Console.WriteLine("===========TOTAL POR PESSOA============");
        foreach(var p in _context.Pessoas)
        {
            double receitas = 0.00;
            double despesas = 0.00;

            foreach(var t in _context.Transacoes)
            {
                if(t.PessoaId == p.Id)
                {
                    if(t.Tipo == "RECEITA")
                    {
                        receitas += t.Valor; 
                    }
                    if(t.Tipo == "DESPESA")
                    {
                        despesas += t.Valor;
                    }
                }
            }
            total_receitas += receitas; // depois de percorrer todas transações da pessoa soma ao total de receitas o somatorio das receitas dela
            total_despesas += despesas; // mesma coisa com as despesas
            Console.WriteLine($"Pessoa ID: {p.Id} | Total Receita: R$ {receitas:F2} | Total Despesa: R$ {despesas:F2} | Saldo: R$ {receitas - despesas:F2}");
        }

        Console.WriteLine("======================================");
        Console.WriteLine("===============TOTAL GERAL============");
        Console.WriteLine($"RECEITA FINAL: R$ {total_receitas:F2} | DESPESA FINAL: R$ {total_despesas:F2} | SALDO LÍQUIDO FINAL: R$ {total_receitas - total_despesas:F2}");
    }
}