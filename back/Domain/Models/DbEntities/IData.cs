using System;
using Models.Enums;

namespace Models.DbEntities {
    public interface IData<T> {
        public int Id { get; set; }
        public int FileId { get; set; }
        public T Data { get; set; }
    }
}