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
    public class VoterController : BaseController<Voter>
    {

        public VoterController(ILogger<VoterController> logger, VoterRepository repository) : base(logger, repository)
        {
        }

        //[HttpGet]
        //public IEnumerable<Voter> Get()
        //{
        //    List<Voter> entities = new List<Voter>();
        //    entities.Add(new Voter(1, "First", "the first entity", DateTime.UtcNow.Ticks));
        //    entities.Add(new Voter(2, "Second", "the second entity", DateTime.UtcNow.Ticks));
        //    entities.Add(new Voter(3, "Third", "the third entity", DateTime.UtcNow.Ticks));
        //    entities.Add(new Voter(4, "Fourth", "the fourth entity", DateTime.UtcNow.Ticks));

        //    return entities;
        //}
    }
}
