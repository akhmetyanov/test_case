using System.Linq;
using Models.DbEntities;
using Models.DTO;
using NetTopologySuite.Geometries;
namespace Models.Mapper
{
    public class FileMapper
    {
        FileDbContext dbContext;
        public FileMapper(FileDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        private IFileEntity FindFileInDb(IFileEntity fileEntity)
        {
            FileEntity file;

            try
            {
                file = dbContext.Files.Single(f => f.Id == fileEntity.Id);
            }
            catch
            {
                return null;
            }

            return file;
        }

        public IDtoFile<string> FileToTextDTO(IFileEntity fileEntity)
        {
            var file = FindFileInDb(fileEntity);
            TextFileDTO textFile = new TextFileDTO();

            textFile.Data = dbContext.Texts
                .Where(t => t.FileId == file.Id)
                .FirstOrDefault()
                .Data;

            return textFile;
        }

        public IDtoFile<LineString> FileToLineDTO(IFileEntity fileEntity)
        {
            var file = FindFileInDb(fileEntity);
            LineFileDTO lineFile = new LineFileDTO();

            lineFile.Data = dbContext.Lines
                .Where(l => l.FileId == file.Id)
                .FirstOrDefault()
                .Data;

            return lineFile;
        }

        public IDtoFile<Point> FileToPointDTO(IFileEntity fileEntity)
        {
            var file = FindFileInDb(fileEntity);
            PointFileDTO pointFile = new PointFileDTO();

            pointFile.Data = dbContext.Points
                .Where(p => p.FileId == file.Id)
                .FirstOrDefault()
                .Data;

            return pointFile;
        }

        public IDtoFile<Polygon> FileToPolygoneDTO(IFileEntity fileEntity)
        {
            var file = FindFileInDb(fileEntity);
            PolygonFileDTO polygoneFile = new PolygonFileDTO();

            polygoneFile.Data = dbContext.Polygones
                .Where(p => p.FileId == file.Id)
                .FirstOrDefault()
                .Data;

            return polygoneFile;
        }
        public FileStructureTreeDTO FileToFileStructureDto(IFileEntity fileEntity)
        {
            var fsDTO = new FileStructureTreeDTO();
            fsDTO.Id = fileEntity.Id;
            fsDTO.ParentId = fileEntity.ParentId;
            fsDTO.Name = fileEntity.Name;
            fsDTO.Extension = fileEntity.Extension;
            fsDTO.CreatedDate = fileEntity.CreatedDate;
            fsDTO.UpdatedDate = fileEntity.UpdatedDate;
            fsDTO.Children = new System.Collections.Generic.List<FileStructureTreeDTO>();
            return fsDTO;
        }
    }
}