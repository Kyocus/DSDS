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

namespace DecisionSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseController<T> where T : IAggregateRoot
    {
        private readonly ILogger<BaseController<T>> _logger;

        protected IRepository<T> _repository;

        protected IDomain<T> _domain;

        public BaseController(ILogger<BaseController<T>> logger, IRepository<T> repo, IDomain<T> domain)
        {
            _logger = logger;
            _repository = repo;
            _domain = domain;
        }

        [HttpGet]
        public IEnumerable<T> GetAll()
        {
            //List<T> entities = new List<T>();
            //return _repository.FindAll();
            return _domain.GetAll();
        }

        [HttpPost]
        public T Post(T entity) {
            return _domain.Create(entity);
        }
        [HttpPut]
        public T Put(T entity) {
            return _domain.Update(entity);
        }
        [HttpDelete]
        public void Delete(int id) {
            _domain.Delete(id);
        }
    }
}
