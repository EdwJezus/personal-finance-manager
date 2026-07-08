public class TotalDto
{
    public double TotalReceita { get; set; }
    public double TotalDespesa { get; set; }
    public double TotalSaldo { get; set; }
    public List<TotalPessoaDto> TotaisPessoas { get; set; } = [];
}
