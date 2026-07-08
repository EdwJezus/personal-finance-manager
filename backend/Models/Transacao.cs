namespace backend.Models
{
    public class Transacao
    {
        public int Id { get; set; } //gerar automatico
        public string Descricao { get; set; } = ""; 
        public double Valor { get; set; }
        public string Tipo { get; set; } = "";
        public int PessoaId { get; set; } //associação

        public Pessoa Pessoa { get; set; } = null!; //associação

        public override string ToString()
        {
            return $"ID: {Id} | Descrição: {Descricao} | Valor: {Valor} | Tipo: {Tipo} | PessoaId: {PessoaId}";
        }
    }
}