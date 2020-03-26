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
    public class VoterController : BaseController<Voter, VoterDto>
    {

        public VoterController(ILogger<VoterController> logger, IRepository<Voter> repository, IDomain<Voter, VoterDto> domain) : base(logger, repository, domain)
        {
        }

        [NonAction]
        public override VoterDto Post(VoterDto dto)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public VoterDto Post(PersistVoterDto dto)
        {
            return ((VoterDomain)_domain).Create(dto);
        }

    }
}
