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
    public class DecisionController : BaseController<Decision, DecisionDto>
    {
        private readonly IDomain<Group, GroupDto> _groupDomain;
        private readonly IDomain<Vote, VoteDto> _voteDomain;


        public DecisionController(ILogger<DecisionController> logger, IRepository<Decision> repository, IDomain<Decision, DecisionDto> domain, IDomain<Group, GroupDto> groupDomain, IDomain<Vote, VoteDto> voteDomain) : base(logger, repository, domain)
        {
            _groupDomain = groupDomain;
            _voteDomain = voteDomain;
        }

        [HttpPost]
        public override ActionResult<DecisionDto> Post(DecisionDto dto)
        {
            try
            {
                var result = _domain.Create(dto);

                var group = _groupDomain.Get(dto.GroupId);

                foreach (var voter in group.Voters)
                {
                    var vote = new VoteDto();
                    vote.VoterId = voter.Id;
                    vote.Voter = voter;

                    _voteDomain.Create(vote);

                }

                return CreatedAtAction("Post", result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }


        [HttpGet]
        [Route("User/{id}")]
        public ActionResult<IEnumerable<DecisionDto>> GetByUserId(long id)
        {
            var result = ((DecisionDomain)_domain).GetByUserId(id);
            if (result != null && result.Count() > 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("Group/{id}")]
        public ActionResult<IEnumerable<DecisionDto>> GetByGroupId(long id)
        {
            var result = ((DecisionDomain)_domain).GetByGroupId(id);
            if (result != null && result.Count() > 0)
            {
                return Ok(result);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
