using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domains
{
    public interface IDomain<TEntity, TDto>
    {
        TDto Get(int id);
        IEnumerable<TDto> GetAll();
        TDto Create(TDto entity);
        TDto Update(TDto entity);
        Task<TDto> UpdateAsync(TDto entity);
        void Delete(int id);
    }
}
