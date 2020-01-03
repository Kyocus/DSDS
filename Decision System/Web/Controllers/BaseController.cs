using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DecisionSystem.Data;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Core.Interfaces;

namespace DecisionSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BaseController<T> where T : IAggregateRoot
    {
        private readonly ILogger<BaseController<T>> _logger;

        protected IRepository<T> _repository;

        public BaseController(ILogger<BaseController<T>> logger, IRepository<T> repo)
        {
            _logger = logger;
            _repository = repo;
        }

        [HttpGet]
        public IEnumerable<T> GetAll()
        {
            List<T> entities = new List<T>();
            return _repository.FindAll();
        }
    }
}
