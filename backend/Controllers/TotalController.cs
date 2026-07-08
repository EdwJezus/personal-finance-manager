namespace backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using backend.Services;

[ApiController]
[Route("api/[controller]")]
public class TotalController : ControllerBase
{
    private readonly TotalService _totalService;

    public TotalController(TotalService totalService)
    {
        _totalService = totalService;
    }

    [HttpGet]
    public IActionResult ListarValoresTotais()
    {
        TotalDto total = _totalService.ListarValoresTotais();
        return Ok(total);
    }
}