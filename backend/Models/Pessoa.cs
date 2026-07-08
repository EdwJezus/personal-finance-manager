namespace backend.Models
{
    public class Pessoa
    {
        public int Id { get; set; } //gerar automatico
        public string Nome { get; set; } = ""; 
        public int Idade { get; set; }

        public List<Transacao> Transacoes { get; set; } = [];

        public override string ToString()
        {
            return $"ID: {Id} | Nome: {Nome} | Idade: {Idade}";
        }
    }
}