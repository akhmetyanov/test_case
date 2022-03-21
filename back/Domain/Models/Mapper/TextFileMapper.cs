using System.Linq;
using Models.DbEntities;
using Models.DTO;

namespace Models.Mapper
{
    public class TextFileMapper
    {
        FileDbContext dbContext;
        public TextFileMapper(FileDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public TextFileDTO Get(IFileEntity file)
        {
            var f = dbContext.Files.Where(f => f.Id == file.Id).FirstOrDefault();
            var t = dbContext.Texts.Where(t => t.FileId == file.Id).FirstOrDefault();

            var dto = new TextFileDTO();
            dto.Id = f.Id;
            dto.ParentId = f.ParentId;
            dto.Name = f.Name;
            dto.Extension = f.Extension;
            dto.CreatedDate = f.CreatedDate;
            dto.UpdatedDate = f.UpdatedDate;
            dto.Data = t.Data;

            return dto;
        }
    }
}