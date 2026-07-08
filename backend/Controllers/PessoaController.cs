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
        _pessoaService.CriarPessoa(dto.Nome, dto.Idade);
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult DeletarPessoa(int id)
    {
        _pessoaService.DeletarPessoa(id);
        
        return Ok();
    }

    [HttpGet]
    public IActionResult ListarPessoas()
    {
        List<Pessoa> pessoas = _pessoaService.ListarPessoas();
        return Ok(pessoas);
    }
}