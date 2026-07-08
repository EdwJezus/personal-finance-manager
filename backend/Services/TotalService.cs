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

    public TotalDto ListarValoresTotais()
    {
        double total_receitas = 0.00;
        double total_despesas = 0.00;
        TotalDto total_dto = new TotalDto();

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

            TotalPessoaDto total_pessoa = new TotalPessoaDto();
            total_pessoa.Id = p.Id;
            total_pessoa.PessoaReceita = receitas;
            total_pessoa.PessoaDespesa = despesas;
            total_pessoa.PessoaSaldo = receitas - despesas;
        
            total_dto.TotaisPessoas.Add(total_pessoa);
        }

        total_dto.TotalReceita = total_receitas;
        total_dto.TotalDespesa = total_despesas;
        total_dto.TotalSaldo = total_receitas - total_despesas;

        return total_dto;
    }
}