using NetTopologySuite.Geometries;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Models.DbEntities
{
    public class PointEntity : IData<Point>
    {
        public int Id { get; set; }
        public int FileId { get; set; }
        public Point Data { get; set; }
    }

    public class PointEntityConfiguration : IEntityTypeConfiguration<PointEntity>
    {
        public void Configure(EntityTypeBuilder<PointEntity> builder)
        {
            builder.ToTable("point_data");
            builder.Property(p => p.Id).HasColumnName("id");
            builder.Property(p => p.FileId).HasColumnName("file_id");
            builder.Property(p => p.Data).HasColumnName("data");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Id).UseIdentityByDefaultColumn()
                .HasIdentityOptions(startValue: 0);
        }
    }
}