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

    public string CriarPessoa(string nome, int idade)
    {
        Pessoa pessoa = new Pessoa();

        // define os dados da pessoa que será salvo no banco
        pessoa.Nome = nome;
        pessoa.Idade = idade;
        
        // adiciona a pessoa no contexto e salva no banco
        _context.Pessoas.Add(pessoa);
        _context.SaveChanges();

        // alerta
        return "Pessoa criada com sucesso";
    }

    public string DeletarPessoa(int id)
    {
        // carrega dados do banco para memória antes da remoção
        List<Pessoa> pessoas = _context.Pessoas.ToList();
        List<Transacao> transacoes = _context.Transacoes.ToList();

        // remove todas as transações vinculadas à pessoa antes de remover a pessoa
        foreach(var t in transacoes)
        {
            if(t.PessoaId == id)
            {
                _context.Transacoes.Remove(t);
            }
        }

        // procura e remove a pessoa pelo seu ID
        foreach(var p in pessoas)
        {
            if(p.Id == id)
            {
                _context.Pessoas.Remove(p);

                // salva todas as alterações realizadas no banco
                _context.SaveChanges();

                return "Pessoa removida com sucesso";
            }       
        }
        return "!ID não encontrado!";
    }

    public List<Pessoa> ListarPessoas()
    {
        // retorna todas as pessoas cadastradas no banco
        return _context.Pessoas.ToList();
    }
}