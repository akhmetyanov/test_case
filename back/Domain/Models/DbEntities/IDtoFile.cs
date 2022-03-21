using System;
using Models.Enums;

namespace Models.DbEntities {
    public interface IDtoFile<T>: IFileEntity {
        public T Data { get; set; }
    }
}