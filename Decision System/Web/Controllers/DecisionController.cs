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

namespace DecisionSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DecisionController : BaseController<Decision>
    {

        public DecisionController(ILogger<DecisionController> logger, DecisionRepository repository) : base(logger, repository)
        {
        }

        //[HttpGet]
        //public IEnumerable<Decision> Get()
        //{
        //    List<Decision> entities = new List<Decision>();
        //    entities.Add(new Decision(1, DateTime.UtcNow.Ticks, "description", DateTime.UtcNow.Ticks, "name 1", new Status(1, "status 1"), DateTime.UtcNow.Ticks));
        //    entities.Add(new Decision(2, DateTime.UtcNow.Ticks, "description", DateTime.UtcNow.Ticks, "name 2", new Status(2, "status 2"), DateTime.UtcNow.Ticks));
        //    entities.Add(new Decision(3, DateTime.UtcNow.Ticks, "description", DateTime.UtcNow.Ticks, "name 3", new Status(3, "status 3"), DateTime.UtcNow.Ticks));

        //    return entities;
        //}
    }
}
