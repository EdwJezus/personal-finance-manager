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

    public void CriarTransacao(string Descricao, double Valor, string Tipo, int PessoaId)
    {
        bool id_compativel = false; // var auxiliar para foreach (para buscar pessoa com ID da transação)
        Pessoa temp_pessoa = new Pessoa(); // var auxiliar verificar idade da pessoa no if no CriaTransacao

        foreach(var p in _context.Pessoas) // percorre pessoas
        {
            if(p.Id == PessoaId) // verifica se existe uma pessoa com id igual a transação
            {
                id_compativel = true; // existe a pessoa
                temp_pessoa = p;
                break;
            }
        }
        if(id_compativel) // se os ids foram compativeis
        {
            if (temp_pessoa.Idade < 18 && Tipo.ToUpper() == "RECEITA") // verifica se uma transação de um menor foi registrada como RECEITA
            {
                Console.WriteLine("!Menores de 18 só podem registrar DESPESAS!");
            }
            else // no caso da transação ser normal
            {
                Transacao transacao = new Transacao();
                transacao.Descricao = Descricao;
                transacao.Valor = Valor;
                transacao.Tipo = Tipo.ToUpper();
                transacao.PessoaId = PessoaId;

                _context.Transacoes.Add(transacao);       
                _context.SaveChanges();
            }
        }
        else // se os ids não foram compativeis (não existe pessoa com esse id)
        {
            Console.WriteLine("!ERRO! Esse ID de pessoa não existe!"); // id de pessoa não existente
        }
    }

    public void ListarTransacoes()
    {
        foreach(var t in _context.Transacoes)
        {
            Console.WriteLine(t);
        }
    }
}