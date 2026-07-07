namespace backend.Services;
using backend.Models;
using backend.Contexts;

public class PessoaService
{
    private readonly TabelaContexto _context;
    public PessoaService(TabelaContexto context)
    {
        _context = context;
    }

    public void CriarPessoa(string Nome, int Idade)
    {
        Pessoa pessoa = new Pessoa();
        pessoa.Nome = Nome;
        pessoa.Idade = Idade;
        
        _context.Pessoas.Add(pessoa); // salva pessoa no banco
        _context.SaveChanges();
    }

    public void DeletarPessoa(int Id)
    {
        List<Pessoa> pessoas = _context.Pessoas.ToList(); // carrega pessoas do banco para memoria
        List<Transacao> transacoes = _context.Transacoes.ToList(); // carrega transações do banco para memoria

        foreach(var t in transacoes)
        {
            if(t.PessoaId == Id)
            {
                _context.Transacoes.Remove(t); // remove transações da pessoa do banco
            }
        }

        foreach(var p in pessoas)
        {
            if(p.Id == Id)
            {
                _context.Pessoas.Remove(p); // remove pessoa do banco
                break;
            }
        }

        _context.SaveChanges();
    }

    public void ListarPessoas()
    {
        foreach(var p in _context.Pessoas.ToList())
        {
            Console.WriteLine(p);
        }
    }
}