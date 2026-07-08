namespace backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private readonly PessoaService _pessoaService;

    public PessoaController(PessoaService pessoaService)
    {
        _pessoaService = pessoaService;
    }

    [HttpPost]
    public IActionResult CriarPessoa(CriarPessoaDto dto)
    {
        string mensagem = _pessoaService.CriarPessoa(dto.Nome, dto.Idade);
        return Ok(mensagem);
    }

    [HttpDelete("{id}")]
    public IActionResult DeletarPessoa(int id)
    {
        string mensagem = _pessoaService.DeletarPessoa(id);
        
        return Ok(mensagem);
    }

    [HttpGet]
    public IActionResult ListarPessoas()
    {
        List<Pessoa> pessoas = _pessoaService.ListarPessoas();
        return Ok(pessoas);
    }
}