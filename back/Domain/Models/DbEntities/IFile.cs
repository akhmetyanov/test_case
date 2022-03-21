using System;
using Models.Enums;

namespace Models.DbEntities {
    public interface IFileEntity {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public FileExtension Extension { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
}