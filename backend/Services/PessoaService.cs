namespace backend.Services;
using backend.Models;

public class PessoaService
{
    public static List<Pessoa> pessoas = []; 
    public static List<Transacao> transacoes = []; 

    public void CriarPessoa(int Id, string Nome, int Idade)
    {
        bool id_registrado = false;

        foreach(var p in pessoas)
        {
            if(p.Id == Id)
            {
                
                id_registrado = true; // já existe o ID no sistema
                break;
            }
        }
        if(id_registrado)
        {
            Console.WriteLine("!ERRO! ID já registrado!");
        }
        else
        {
            Pessoa pessoa = new Pessoa();
            pessoa.Id = Id;
            pessoa.Nome = Nome;
            pessoa.Idade = Idade;
            
            pessoas.Add(pessoa);
        }
    }

    public void DeletarPessoa(int Id)
    {
        List<Pessoa> pessoas_copia = [..pessoas]; //shallow copy pessoas
        List<Transacao> transacoes_copia = [..transacoes]; //shallow copy transacoes 

        foreach(var p in pessoas_copia)
        {
            if(p.Id == Id)
            {
                pessoas.Remove(p);
                break;
            }
        }
        foreach(var t in transacoes_copia)
        {
            if(t.PessoaId == Id)
            {
                transacoes.Remove(t);
            }
        }
    }

    public void ListarPessoas()
    {
        foreach(var p in pessoas)
        {
            Console.WriteLine(p);
        }
    }
}