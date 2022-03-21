using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Models.DbEntities;
using Models.Enums;

namespace Models
{
    public class FileDbContext : DbContext
    {
        public FileDbContext(DbContextOptions<FileDbContext> options): base(options) {
            
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.HasPostgresExtension("postgis");
            builder.HasPostgresEnum<FileExtension>();
            new FileEntityConfiguration().Configure(builder.Entity<FileEntity>());
            new TextEntityConfiguration().Configure(builder.Entity<TextEntity>());
            new LineEntityConfiguration().Configure(builder.Entity<LineEntity>());
            new PointEntityConfiguration().Configure(builder.Entity<PointEntity>());
            new PolygoneEntityConfiguration().Configure(builder.Entity<PolygoneEntity>());
        }

        public DbSet<FileEntity> Files { get; set; }
        public DbSet<PointEntity> Points { get; set; }
        public DbSet<LineEntity> Lines { get; set; }   
        public DbSet<PolygoneEntity> Polygones { get; set; }
        public DbSet<TextEntity> Texts { get; set; }
    }
}