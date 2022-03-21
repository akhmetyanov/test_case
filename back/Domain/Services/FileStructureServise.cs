using System.Linq;
using Models;
using Models.Enums;
using Models.DbEntities;
using Models.Mapper;
using Models.DTO;
using System.Collections.Generic;
using System;

namespace Services
{
    public class FileStructureServise
    {
        FileDbContext dbContext;
        FileMapper fileMapper;
        public FileStructureServise(FileDbContext dbContext)
        {
            this.dbContext = dbContext;
            this.fileMapper = new FileMapper(dbContext);
        }
        public List<FileStructureTreeDTO> GetFileStructure()
        {
            var root = dbContext.Files
                .Where(f => f.ParentId == null)
                .Select(f => this.fileMapper.FileToFileStructureDto(f))
                .ToList();

            var structure = BuildStructure(root);
            return structure;
        }

        public FileStructureTreeDTO GetParentById(int id)
        {
            var root = dbContext.Files
                .Where(f => f.Id == id)
                .Select(f => this.fileMapper.FileToFileStructureDto(f))
                .ToList();

            var parent = BuildStructure(root)[0];
            return parent;
        }

        private List<FileStructureTreeDTO> BuildStructure(List<FileStructureTreeDTO> files)
        {
            foreach (var file in files)
            {
                file.Children = dbContext.Files
                    .Where(f => f.ParentId == file.Id)
                    .Select(f => this.fileMapper.FileToFileStructureDto(f))
                    .ToList();

                BuildStructure(file.Children);
            }

            return files;
        }


        public bool Rename(int id, string name)
        {
            try
            {
                var item = dbContext.Files.Where(f => f.Id == id).FirstOrDefault();
                item.Name = name;
                dbContext.SaveChanges();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public bool Delete(int id)
        {
            try
            {
                var item = dbContext.Files.Where(f => f.Id == id).FirstOrDefault();
                dbContext.Files.Remove(item);
                dbContext.SaveChanges();
            }
            catch
            {
                return false;
            }
            return true;
        }

        public bool NewItem(string name, FileExtension ex, int parentId)
        {
            var folder = new FileEntity()
            {
                Name = name,
                CreatedDate = System.DateTime.Now,
                Extension = ex
            };

            if (parentId != -1)
            {
                folder.ParentId = parentId;
            }

            try
            {

                dbContext.Files.Add(folder);
                dbContext.SaveChanges();
            }
            catch
            {
                return false;
            }

            return true;
        }
    }
}