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
using Microsoft.AspNetCore.Http;

namespace DecisionSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseController<TEntity, TDto> : Controller where TEntity : BaseModel<TDto>, IAggregateRoot where TDto : BaseDto<TEntity>, IDto
    {
        private readonly ILogger<BaseController<TEntity, TDto>> _logger;

        protected IRepository<TEntity> _repository;

        protected IDomain<TEntity, TDto> _domain;

        private readonly IHttpContextAccessor _httpContextAccessor;
        public BaseController(IHttpContextAccessor httpContextAccessor, ILogger<BaseController<TEntity, TDto>> logger, IRepository<TEntity> repo, IDomain<TEntity, TDto> domain)
        {

            _logger = logger;
            _repository = repo;
            _domain = domain;
            _httpContextAccessor = httpContextAccessor;


        }

        [HttpGet]
        //[Authorize]
        [Route("{id}")]
        public virtual ActionResult<IEnumerable<TDto>> Get(long id)
        {
            try
            {
                var result = _domain.Get(id);
                return CreatedAtAction("Post", result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [HttpGet]
        //[Authorize]
        public virtual ActionResult<IEnumerable<TDto>> GetAll()
        {
            try
            {
                var result = _domain.GetAll();
                return CreatedAtAction("Post", result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public virtual ActionResult<TDto> Post(TDto dto)
        {
            try
            {
                var result = _domain.Create(dto);

                return CreatedAtAction("Post", result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

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

        [HttpGet]
        protected string GetUser()
        {
            return _httpContextAccessor.HttpContext.User.FindFirst("edipi").Value;
        }

        public virtual bool CanDelete()
        {
            return true;
        }

        /// <summary>
        /// The EDIPI of the current user based on provided client certificate.
        /// </summary>
        protected virtual string CurrentUserEdipi
        {
            get
            {
                if (User != null && User.Claims != null)
                {
                    var edipi = User.Claims.Where(c => c.Type == "edipi").FirstOrDefault()?.Value;
                    return edipi;
                }
                else
                {
                    _logger.LogWarning("CurrentUserEdipi was called but no authenticated identity was found.");
                    return string.Empty;
                }
            }
        }

        public virtual bool CanGet()
        {
            return true;
        }
        public virtual bool CanPost()
        {
            return true;
        }
        public virtual bool CanPut()
        {
            return true;
        }
    }
}
