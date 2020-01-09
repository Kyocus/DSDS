using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DecisionSystem.Data;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DecisionSystem.Repository;
using Core.Interfaces;
using Core.Domains;

namespace DecisionSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class VoteController : BaseController<Vote>
    {
        public VoteController(ILogger<VoteController> logger, IRepository<Vote> repository, IDomain<Vote> domain) : base(logger, repository, domain)
        {
        }

        //[HttpGet]
        //public IEnumerable<Vote> Get()
        //{
        //    List<Vote> entities = new List<Vote>();
        //    entities.Add(new Vote(1, DateTime.UtcNow.Ticks, 1, 1));

        //    return entities;
        //}
    }
}
