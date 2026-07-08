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

    public void CriarPessoa(string nome, int idade)
    {
        Pessoa pessoa = new Pessoa();
        pessoa.Nome = nome;
        pessoa.Idade = idade;
        
        _context.Pessoas.Add(pessoa); // salva pessoa no banco
        _context.SaveChanges();
    }

    public void DeletarPessoa(int id)
    {
        List<Pessoa> pessoas = _context.Pessoas.ToList(); // carrega pessoas do banco para memoria
        List<Transacao> transacoes = _context.Transacoes.ToList(); // carrega transações do banco para memoria

        foreach(var t in transacoes)
        {
            if(t.PessoaId == id)
            {
                _context.Transacoes.Remove(t); // remove transações da pessoa do banco
            }
        }

        foreach(var p in pessoas)
        {
            if(p.Id == id)
            {
                _context.Pessoas.Remove(p); // remove pessoa do banco
                break;
            }
        }

        _context.SaveChanges();
    }

    public List<Pessoa> ListarPessoas()
    {
        return _context.Pessoas.ToList();
    }
}