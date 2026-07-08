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

            // percorre as transações para calcular os valores da pessoa atual
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
            // acumula os valores individuais para gerar o total geral
            totalReceitas += receitas;
            totalDespesas += despesas;

            TotalPessoaDto totalPessoa = new TotalPessoaDto();

            // cria o resumo financeiro de cada pessoa
            totalPessoa.Id = p.Id;
            totalPessoa.PessoaReceita = receitas;
            totalPessoa.PessoaDespesa = despesas;
            totalPessoa.PessoaSaldo = receitas - despesas;
        
            totalDto.TotaisPessoas.Add(totalPessoa);
        }

        // define os valores financeiros gerais do sistema
        totalDto.TotalReceita = totalReceitas;
        totalDto.TotalDespesa = totalDespesas;
        totalDto.TotalSaldo = totalReceitas - totalDespesas;

        return totalDto;
    }
}