using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core.Domains
{
    public class VoteDomain : Domain<Vote, VoteDto>
    {
        ILogger<VoteDomain> _logger;

        public VoteDomain(IRepository<Vote> repo, ILogger<VoteDomain> logger) : base(repo, logger)
        {

            _logger = logger;
        }

        public List<VoteDto> GetByUserId(long id)
        {
            return _repository.FindAll()
                .Where(x => x.Voter.Id == id)
                .Select(x => x.AsDto())
                .ToList();
        }

    }
}
