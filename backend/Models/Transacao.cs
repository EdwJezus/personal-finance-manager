namespace backend.Models
{
    public class Transacao
    {
        public int Id; //gerar automatico
        public string Descricao = "";
        public double Valor;
        public string Tipo = "";
        public int PessoaId; //Associação

        public override string ToString()
        {
            return $"ID: {Id} | Descrição: {Descricao} | Valor: {Valor} | Tipo: {Tipo} | PessoaId: {PessoaId}";
        }
    }
}