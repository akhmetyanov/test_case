using System;
using Models.DbEntities;
using Models.Enums;
using NetTopologySuite.Geometries;
using System.Collections.Generic;
namespace Models.DTO
{
    public class FileStructureTreeDTO
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public FileExtension Extension { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public List<FileStructureTreeDTO> Children { get; set; }

    }
    public class TextFileDTO : IDtoFile<string>
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public FileExtension Extension { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string Data { get; set; }
    }

    public class LineFileDTO : IDtoFile<LineString>
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public FileExtension Extension { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public LineString Data { get; set; }
    }

    public class PointFileDTO : IDtoFile<Point>
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public FileExtension Extension { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public Point Data { get; set; }
    }
    public class PolygonFileDTO : IDtoFile<Polygon>
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string Name { get; set; }
        public FileExtension Extension { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public Polygon Data { get; set; }
    }
}