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
    public class StatusController : BaseController<Status, StatusDto>
    {
        public StatusController(ILogger<StatusController> logger, IRepository<Status> repository, IDomain<Status, StatusDto> domain) : base(logger, repository, domain)
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
