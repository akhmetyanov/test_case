using System;
using Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Models.DbEntities
{
    public class FileEntity : IFileEntity
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public FileExtension Extension { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }

    public class FileEntityConfiguration : IEntityTypeConfiguration<FileEntity>
    {
        public void Configure(EntityTypeBuilder<FileEntity> builder)
        {
            builder.ToTable("file");
            builder.Property(p => p.Id).HasColumnName("id");
            builder.Property(p => p.ParentId).HasColumnName("parent_id");
            builder.Property(p => p.Name).HasColumnName("name");
            builder.Property(p => p.Extension).HasColumnName("extention");
            builder.Property(p => p.CreatedDate).HasColumnName("created_date");
            builder.Property(p => p.UpdatedDate).HasColumnName("updated_date");
            builder.HasKey(f => f.Id);
        }
    }
}