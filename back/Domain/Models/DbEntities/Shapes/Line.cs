using NetTopologySuite.Geometries;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Models.DbEntities
{
    public class LineEntity : IData<LineString>
    {
        public int Id { get; set; }
        public int FileId { get; set; }
        public LineString Data { get; set; }
    }

    public class LineEntityConfiguration : IEntityTypeConfiguration<LineEntity>
    {
        public void Configure(EntityTypeBuilder<LineEntity> builder)
        {
            builder.ToTable("line_data");
            builder.Property(l => l.Id).HasColumnName("id");
            builder.Property(l => l.FileId).HasColumnName("file_id");
            builder.Property(l => l.Data).HasColumnName("data");
            builder.HasKey(l => l.Id);
            builder.Property(l => l.Id).UseIdentityByDefaultColumn()
                .HasIdentityOptions(startValue: 0);
            builder.Property(l => l.Data).HasColumnType("geometry (point)");
        }
    }
}