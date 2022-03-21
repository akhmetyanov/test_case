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
    public class TextServise
    {
        FileDbContext dbContext;
        TextFileMapper mapper;

        public TextServise(FileDbContext dbContext)
        {
            this.dbContext = dbContext;
            this.mapper = new TextFileMapper(dbContext);
        }

        public TextFileDTO Get(int fileId)
        {
            var t = dbContext.Texts.Where(t => t.FileId == fileId).FirstOrDefault();

            if (t == null)
            {
                dbContext.Texts.Add(new TextEntity() { FileId = fileId });
                dbContext.SaveChanges();
            }

            var f = dbContext.Files.Where(t => t.Id == fileId).FirstOrDefault();

            var dto = this.mapper.Get(f);

            return dto;
        }

        public bool Update(int fileId, string data)
        {
            var t = dbContext.Texts.Where(t => t.FileId == fileId).FirstOrDefault();
            t.Data = data;
            try { dbContext.SaveChanges(); }
            catch { return false; }
            return true;
        }
    }
}