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
    public class GroupController : BaseController<Group>
    {
        public GroupController(ILogger<GroupController> logger, IRepository<Group> repository, IDomain<Group> domain) : base(logger, repository, domain)
        {
        }

        //[HttpGet]
        //public IEnumerable<Group> Get()
        //{
        //    List<Group> entities = new List<Group>();
        //    entities.Add(new Group(1, "name 1", "description 1", 2, DateTime.UtcNow.Ticks));
        //    entities.Add(new Group(2, "name 2", "description 2", -1, DateTime.UtcNow.Ticks));

        //    return entities;
        //}
    }
}
