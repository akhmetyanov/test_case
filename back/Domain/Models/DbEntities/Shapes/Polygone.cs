using NetTopologySuite.Geometries;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
namespace Models.DbEntities
{
    public class PolygoneEntity : IData<Polygon>
    {
        public int Id { get; set; }
        public int FileId { get; set; }
        public Polygon Data { get; set; }
    }

    public class PolygoneEntityConfiguration : IEntityTypeConfiguration<PolygoneEntity>
    {
        public void Configure(EntityTypeBuilder<PolygoneEntity> builder)
        {
            builder.ToTable("polygone_data");
            builder.Property(p => p.Id).HasColumnName("id");
            builder.Property(p => p.FileId).HasColumnName("file_id");
            builder.Property(p => p.Data).HasColumnName("data");
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Id).UseIdentityByDefaultColumn()
                .HasIdentityOptions(startValue: 0);
        }
    }
}