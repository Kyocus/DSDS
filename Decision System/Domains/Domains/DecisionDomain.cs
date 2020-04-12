using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;

namespace Core.Domains
{
    public class DecisionDomain : Domain<Decision, DecisionDto>
    {
        ILogger<DecisionDomain> _logger;
        public DecisionDomain(IRepository<Decision> repo, ILogger<DecisionDomain> logger) : base(repo, logger)
        {
            _logger = logger;
        }


        public List<DecisionDto> GetByUserId(long id)
        {
            return _repository.FindAll()
                .Where(x => x.Votes
                    .Where(v =>
                        v.Voter.User.Id == id
                    ).Count() > 0)
                .Select(x => x.AsDto())
                .ToList();
        }
    }
}
