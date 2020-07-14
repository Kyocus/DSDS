using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domains
{
    public class DecisionDomain : Domain<Decision, DecisionDto>
    {
        ILogger<DecisionDomain> _logger;
        public DecisionDomain(IRepository<Decision> repo, ILogger<DecisionDomain> logger) : base(repo, logger)
        {
            _logger = logger;
        }

        public async Task<DecisionDto> Create(DecisionDto dto)
        {
            DateTimeOffset time = new DateTimeOffset(DateTime.Now);

            var entity = dto.AsEntity();
            entity.CreationDate = time.ToUnixTimeSeconds();
            entity.ExpirationDate = time.AddYears(1).ToUnixTimeSeconds();

            GroupDecision gd = new GroupDecision();
            gd.GroupId = dto.GroupId;
            gd.DecisionId = dto.Id;

            entity.GroupDecisions.Add(gd);

            var result = _repository.Create(entity).AsDto();

            if (result != null)
            {
                return Get(result.Id);
            }
            else
            {
                return null;
            }
        }

        public IEnumerable<DecisionDto> GetByGroupId(long id)
        {
            return _repository.FindAll()
                .Where(x => x.GroupDecisions
                    .Where(v =>
                        v.GroupId == id
                    ).Count() > 0)
                .Select(x => x.AsDto())
                .ToList();
        }

        public IEnumerable<DecisionDto> GetByUserId(long id)
        {
            return _repository.FindAll()
                .Where(x => x.Votes
                    .Where(v =>
                        v.Voter.Id == id
                    ).Count() > 0)
                .Select(x => x.AsDto())
                .ToList();
        }
    }
}
