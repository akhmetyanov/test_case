using Microsoft.AspNetCore.Mvc;
using Services;
using Models;
using Models.Enums;

namespace FileManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileStructureController : ControllerBase
    {
        FileStructureServise fileStructureServise;
        FileDbContext dbContext;
        public FileStructureController(FileDbContext dbContext)
        {
            this.dbContext = dbContext;
            this.fileStructureServise = new FileStructureServise(dbContext);
        }

        [HttpGet]
        public IActionResult GetFilesStructure()
        {
            return Ok(fileStructureServise.GetFileStructure());
        }

        [HttpGet("{id}")]
        public IActionResult GetParentById(int id)
        {
            return Ok(fileStructureServise.GetParentById(id));
        }

        [HttpPut("{id}/{name}")]
        public IActionResult Rename(int id, string name)
        {
            return Ok(fileStructureServise.Rename(id, name));
        }

        [HttpPut("{id}/{name}/{extension}")]
        public IActionResult Create(int id, string name, FileExtension extension)
        {
            var res = this.fileStructureServise.NewItem(name, extension, id);
            return Ok(res);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return Ok(fileStructureServise.Delete(id));
        }
    }
}