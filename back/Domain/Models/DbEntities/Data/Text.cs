using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Models.DbEntities
{
    public class TextEntity : IData<string>
    {
        public int Id { get; set; }
        public int FileId { get; set; }
        public string Data { get; set; }
    }

    public class TextEntityConfiguration : IEntityTypeConfiguration<TextEntity>
    {
        public void Configure(EntityTypeBuilder<TextEntity> builder)
        {
            builder.ToTable("text_data");
            builder.Property(t => t.Id).HasColumnName("id");
            builder.Property(t => t.FileId).HasColumnName("file_id");
            builder.Property(t => t.Data).HasColumnName("data");
            builder.HasKey(t => t.Id);
            builder.Property(t => t.Id).UseIdentityByDefaultColumn()
                .HasIdentityOptions(startValue: 0);
        }
    }
}