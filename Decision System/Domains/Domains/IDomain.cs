using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public interface IDomain<T>
    {
        T Get(int id);
        IEnumerable<T> GetAll();
        T Create(T entity);
        T Update(T entity);
        void Delete(int id);
    }
}
