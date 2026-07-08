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

    public string CriarTransacao(string descricao, double valor, string tipo, int pessoaId)
    {
        bool idCompativel = false; 
        Pessoa tempPessoa = new Pessoa(); 

        // busca a pessoa relacionada à transação para validar regras de negócio
        foreach(var p in _context.Pessoas)
        {
            if(p.Id == pessoaId) 
            {
                idCompativel = true; 
                tempPessoa = p;
                break;
            }
        }
        if(idCompativel)
        {
            // menores de idade podem apenas registrar despesas
            if (tempPessoa.Idade < 18 && tipo.ToUpper() == "RECEITA")
            {
                return "!Menores de 18 só podem registrar DESPESAS!";
            }
            else 
            {
                Transacao transacao = new Transacao();

                // define os dados da transação antes de salvar no banco
                transacao.Descricao = descricao;
                transacao.Valor = valor;
                transacao.Tipo = tipo.ToUpper();
                transacao.PessoaId = pessoaId;

                // adiciona a transação ao banco
                _context.Transacoes.Add(transacao);       
                _context.SaveChanges();

                // alerta
                return "Transação criada com sucesso";
            }
        }
        else
        {
            // impede cadastro de transação sem uma pessoa existente
            return "!ERRO! Esse ID de pessoa não existe!";
        }
    }

    public List<Transacao> ListarTransacoes()
    {
        return _context.Transacoes.ToList();
    }
}