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
    public class VoteController : BaseController<Vote>
    {
        public VoteController(ILogger<VoteController> logger, VoteRepository repository) : base(logger, repository)
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
