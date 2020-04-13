using Core.Interfaces;
using Core.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domains
{
    public class Domain<TEntity, TDto> : IDomain<TEntity, TDto> where TEntity : BaseModel<TDto>, IAggregateRoot where TDto : BaseDto<TEntity>, IDto
    {
        protected readonly IRepository<TEntity> _repository;
        private ILogger<Domain<TEntity, TDto>> _logger;

        public Domain(IRepository<TEntity> repo, ILogger<Domain<TEntity, TDto>> logger)
        {
            _repository = repo;
            _logger = logger;
        }

        public virtual TDto Get(int id)
        {
            return _repository.FindById(id).AsDto();
        }

        public virtual IEnumerable<TDto> GetAll()
        {
            return _repository
                //.FindAll()
                .FindAllAsync().Result
                .ToList().Select(x => x.AsDto());
        }

        public virtual IEnumerable<TDto> Query(string query)
        {
            Func<TEntity, bool> queryProperties = new Func<TEntity, bool>((x) => {
                foreach (PropertyDescriptor descriptor in TypeDescriptor.GetProperties(x))
                {
                    string name = descriptor.Name;
                    object value = descriptor.GetValue(x);

                    if (value == query)
                    {
                        return true;
                    }
                }

                return false;
            });

            return _repository
                .FindAllAsync().Result
                .Where(queryProperties)
                .Select(x => x.AsDto())
                .ToList();
        }

        public virtual TDto Create(TDto dto)
        {
            return _repository.Create(dto.AsEntity()).AsDto();
        }

        public virtual TDto Update(TDto dto)
        {
            return _repository.Update(dto.AsEntity()).AsDto();
        }

        public virtual async Task<TDto> UpdateAsync(TDto dto)
        {
            var result = await _repository.UpdateAsync(dto.AsEntity());

            if (result != null)
            {
                return result.AsDto();
            }
            else
            {
                return null;
            }

        }

        public virtual void Delete(int id)
        {
            try
            {
                _repository.Delete(id);
            }
            catch (Exception e)
            {
                _logger.LogError("Error during delete\r\n" + e.Message);
            }
        }
    }
}
