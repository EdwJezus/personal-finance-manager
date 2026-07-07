namespace backend.Services;
using backend.Models;

public class TransacaoService
{
    Pessoa temp_pessoa = new Pessoa(); // var auxiliar verificar idade da pessoa no if no CriaTransacao

    public void CriarTransacao(int Id, string Descricao, double Valor, string Tipo, int PessoaId)
    {
        bool id_registrado = false; // var auxiliar para foreach (para nao repetir IDs)
        bool id_compativel = false; // var auxiliar para foreach (para buscar pessoa com ID da transação)

        foreach(var t in PessoaService.transacoes) // percorre transações
        {
            if(t.Id == Id) // verifica se id da pessoa já existe no sistema
            {
                id_registrado = true; // id existe
                break;   
            }
        }
        if(id_registrado) // SE o id já existe no sistema
        {
            Console.WriteLine("!ERRO! ID já registrado!"); // id de transação já registrado
        }
        else // se o id não existe no sistema
        {
            foreach(var p in PessoaService.pessoas) // percorre pessoas
            {
                if(p.Id == PessoaId) // verifica se existe uma pessoa com id igual a transação
                {
                    id_compativel = true; // existe a pessoa
                    temp_pessoa = p;
                }
            }
            if(id_compativel) // se os ids foram compativeis
            {
                if (temp_pessoa.Idade < 18 && Tipo == "RECEITA") // verifica se uma transação de um menor foi registrada como RECEITA
                {
                    Console.WriteLine("!Menores de 18 só podem registrar DESPESAS!");
                }
                else // no caso da transação ser normal
                {
                    Transacao transacao = new Transacao();
                    transacao.Id = Id;
                    transacao.Descricao = Descricao;
                    transacao.Valor = Valor;
                    transacao.Tipo = Tipo;
                    transacao.PessoaId = PessoaId;

                    PessoaService.transacoes.Add(transacao);       
                }
            }
            else // se os ids não foram compativeis (não existe pessoa com esse id)
            {
                Console.WriteLine("!ERRO! Esse ID de pessoa não existe!"); // id de pessoa não existente
            }
        }
    }

    public void ListarTransacoes()
    {
        foreach(var t in PessoaService.transacoes)
        {
            Console.WriteLine(t);
        }
    }
}