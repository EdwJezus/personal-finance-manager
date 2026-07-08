namespace backend.Services;
using backend.Models;
using backend.Contexts;

public class TransacaoService
{
    private readonly TabelaContexto _context;
    public TransacaoService(TabelaContexto context)
    {
        _context = context;
    }

    public void CriarTransacao(string descricao, double valor, string tipo, int pessoaId)
    {
        bool idCompativel = false; // var auxiliar para foreach (para buscar pessoa com ID da transação)
        Pessoa tempPessoa = new Pessoa(); // var auxiliar verificar idade da pessoa no if no CriaTransacao

        foreach(var p in _context.Pessoas) // percorre pessoas
        {
            if(p.Id == pessoaId) // verifica se existe uma pessoa com id igual a transação
            {
                idCompativel = true; // existe a pessoa
                tempPessoa = p;
                break;
            }
        }
        if(idCompativel) // se os ids foram compativeis
        {
            if (tempPessoa.Idade < 18 && tipo.ToUpper() == "RECEITA") // verifica se uma transação de um menor foi registrada como RECEITA
            {
                Console.WriteLine("!Menores de 18 só podem registrar DESPESAS!");
            }
            else // no caso da transação ser normal
            {
                Transacao transacao = new Transacao();
                transacao.Descricao = descricao;
                transacao.Valor = valor;
                transacao.Tipo = tipo.ToUpper();
                transacao.PessoaId = pessoaId;

                _context.Transacoes.Add(transacao);       
                _context.SaveChanges();
            }
        }
        else // se os ids não foram compativeis (não existe pessoa com esse id)
        {
            Console.WriteLine("!ERRO! Esse ID de pessoa não existe!"); // id de pessoa não existente
        }
    }

    public List<Transacao> ListarTransacoes()
    {
        return _context.Transacoes.ToList();
    }
}