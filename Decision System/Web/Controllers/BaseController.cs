using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DecisionSystem.Data;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Core.Interfaces;
using Core.Domains;
using Microsoft.AspNetCore.Authorization;

namespace DecisionSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseController<TEntity, TDto> where TEntity : BaseModel<TDto>, IAggregateRoot where TDto : BaseDto<TEntity>, IDto
    {
        private readonly ILogger<BaseController<TEntity, TDto>> _logger;

        protected IRepository<TEntity> _repository;

        protected IDomain<TEntity, TDto> _domain;

        public BaseController(ILogger<BaseController<TEntity, TDto>> logger, IRepository<TEntity> repo, IDomain<TEntity, TDto> domain)
        {
            _logger = logger;
            _repository = repo;
            _domain = domain;
        }

        [HttpGet]
        //[Authorize]
        public virtual IEnumerable<TDto> GetAll()
        {
            return _domain.GetAll();
        }

        [HttpPost]
        public virtual TDto Post(TDto dto)
        {
            return _domain.Create(dto);
        }
        //[HttpPut]
        //public virtual TDto Put(TDto dto) {
        //    return _domain.Update(dto);
        //}
        [HttpPut]
        public virtual async Task<TDto> Put(TDto dto)
        {
            var result = await _domain.UpdateAsync(dto);

            if (result != null)
            {
                return result;
            }
            else
            {
                return null;
            }

        }
        [HttpDelete]
        [Route("{id}")]
        public virtual void Delete(int id)
        {
            _domain.Delete(id);
        }

        public virtual bool CanDelete() {
            return true;
        }
        public virtual bool CanGet() {
            return true;
        }
        public virtual bool CanPost() {
            return true;
        }
        public virtual bool CanPut() {
            return true;
        }
    }
}
