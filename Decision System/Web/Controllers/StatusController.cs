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
    public class StatusController : BaseController<Status>
    {
        public StatusController(ILogger<StatusController> logger, StatusRepository repository) : base(logger, repository)
        {
        }

        //[HttpGet]
        //public IEnumerable<Status> Get()
        //{
        //    List<Status> entities = new List<Status>();
        //    entities.Add(new Status(1, "status 1"));
        //    entities.Add(new Status(2, "status 2"));

        //    return entities;
        //}
    }
}
