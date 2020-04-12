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
    public class VoteController : BaseController<Vote, VoteDto>
    {
        public VoteController(ILogger<VoteController> logger, IRepository<Vote> repository, IDomain<Vote, VoteDto> domain) : base(logger, repository, domain)
        {
        }

        [HttpGet]
        [Route("User/{id}")]
        public IEnumerable<VoteDto> GetByUserId(long id)
        {
            return ((VoteDomain)_domain).GetByUserId(id);
        }
    }
}
