using Core.Interfaces;
using Core.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public TDto Get(int id)
        {
            return _repository.FindById(id).AsDto();
        }

        public IEnumerable<TDto> GetAll()
        {
            return _repository.FindAll().ToList().Select(x => (TDto)x.AsDto());
        }

        public TDto Create(TDto dto)
        {
            return _repository.Create(dto.AsEntity()).AsDto();
        }

        public TDto Update(TDto dto)
        {
            return _repository.Update(dto.AsEntity()).AsDto();
        }

        public async Task<TDto> UpdateAsync(TDto dto)
        {
            var result = await _repository.UpdateAsync(dto.AsEntity());

            if (result != null)
            {
                return result.AsDto();
            }
            else {
                return null;
            }

        }

        public void Delete(int id)
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
