using Core.Interfaces;
using Core.Models;
using DecisionSystem.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domains
{
    public class Domain<TEntity, TDto> : IDomain<TEntity, TDto> where TEntity : BaseModel<TDto>, IAggregateRoot where TDto : BaseDto<TEntity>, IDto
    {
        protected readonly IRepository<TEntity> _repository;
        private ILogger<Domain<TEntity, TDto>> _logger;
        private DataContext Database { get; set; }
        public IHttpContextAccessor HttpContext { get; set; }


        public Domain(IRepository<TEntity> repo, ILogger<Domain<TEntity, TDto>> logger)
        {
            _repository = repo;
            _logger = logger;
        }

        public virtual TDto Get(long id)
        {
            var result = _repository.FindById(id);
            return result != null ? result.AsDto() : null;
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
            Func<TEntity, bool> queryProperties = new Func<TEntity, bool>((x) =>
            {
                foreach (PropertyDescriptor descriptor in TypeDescriptor.GetProperties(x))
                {
                    string name = descriptor.Name;
                    object value = descriptor.GetValue(x);

                    if (value.ToString().Contains(query))
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
            var result = _repository.Create(dto.AsEntity()).AsDto();

            if (result != null)
            {
                return Get(result.Id);
            }
            else
            {
                return null;
            }
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

        public virtual void Delete(long id)
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

        /// <summary>
        /// Get the current claims principal.
        /// </summary>
        /// <returns></returns>
        protected ClaimsPrincipal GetClaimsPrincipal()
        {
            return HttpContext.HttpContext.User;
        }

        /// <summary>
        /// Get the current edipi of the user.
        /// </summary>
        /// <returns></returns>
        protected string GetCurrentUserEdipi()
        {
            return GetClaimsPrincipal().Claims
                .Where(c => c.Type.Equals("edipi"))
                .Select(c => c.Value)
                .SingleOrDefault();
        }

        /// <summary>
        /// Get the email of the current user.
        /// </summary>
        /// <returns></returns>
        protected string GetCurrentUserEmail()
        {
            return GetClaimsPrincipal().Claims
                .Where(c => c.Type.Equals(ClaimTypes.Email))
                .Select(c => c.Value)
                .SingleOrDefault();
        }

        protected User GetUserById(string id)
        {
            return null;
            //private readonly IDomain<Voter, VoterDto> _voterDomain = new VoterDomain(new VoterRepository<Voter>(), new Logger<VoterDomain>())

            //return new UserDomain(_repo, _logger);
            //    new UserDomain(new UserRepository(Database), HttpContext, Database).GetUserByEDIPI(edipi);

            //var user = new UserDomain(new UserRepository(Database), HttpContext, Database).GetUserByEDIPI(GetCurrentUserEdipi());

        }

        protected User GetCurrentUser()
        {
            //var user = new UserDomain(new UserRepository(Database), HttpContext, Database).GetUserByEDIPI(GetCurrentUserEdipi());

            //if (user == null)
            //{
            //    throw new Exception("You don't exist");
            //}

            return null;
        }


    }
}
