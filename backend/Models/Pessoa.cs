namespace backend.Models
{
    public class Pessoa
    {
        public int Id; //gerar automatico
        public string Nome = "";
        public int Idade;

        public override string ToString()
        {
            return $"ID: {Id} | Nome: {Nome} | Idade: {Idade}";
        }
    }
}