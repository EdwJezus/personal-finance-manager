namespace backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using backend.Services;
using backend.Models;

[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly TransacaoService _transacaoService;

    public TransacaoController(TransacaoService transacaoService)
    {
        _transacaoService = transacaoService;
    }

    [HttpPost]
    public IActionResult CriarTransacao(CriarTransacaoDto dto)
    {
        string mensagem = _transacaoService.CriarTransacao(dto.Descricao, dto.Valor, dto.Tipo, dto.PessoaId);
        return Ok(mensagem);
    }

    [HttpGet]
    public IActionResult ListarTransacoes()
    {
        List<Transacao> transacoes = _transacaoService.ListarTransacoes();
        return Ok(transacoes);
    }
}