using Microsoft.AspNetCore.Mvc;
using Services;
using Models;
using Models.DTO;

namespace FileManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TextFileController : ControllerBase
    {
        FileDbContext dbContext;
        TextServise servise;
        public TextFileController(FileDbContext dbContext)
        {
            this.dbContext = dbContext;
            this.servise = new TextServise(dbContext);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var r = this.servise.Get(id);
            return Ok(r);
        }

        [HttpPost]
        public IActionResult Update(TextFileDTO text)
        {
            var r = this.servise.Update(text.Id, text.Data);
            return Ok(r);
        }
    }
}