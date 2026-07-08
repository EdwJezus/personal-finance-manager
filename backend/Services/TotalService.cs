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
        double totalReceitas = 0.00;
        double totalDespesas = 0.00;
        TotalDto totalDto = new TotalDto();

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
            totalReceitas += receitas; // depois de percorrer todas transações da pessoa soma ao total de receitas o somatorio das receitas dela
            totalDespesas += despesas; // mesma coisa com as despesas

            TotalPessoaDto totalPessoa = new TotalPessoaDto();
            totalPessoa.Id = p.Id;
            totalPessoa.PessoaReceita = receitas;
            totalPessoa.PessoaDespesa = despesas;
            totalPessoa.PessoaSaldo = receitas - despesas;
        
            totalDto.TotaisPessoas.Add(totalPessoa);
        }

        totalDto.TotalReceita = totalReceitas;
        totalDto.TotalDespesa = totalDespesas;
        totalDto.TotalSaldo = totalReceitas - totalDespesas;

        return totalDto;
    }
}