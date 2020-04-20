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
    public class VoterDomain : Domain<Voter, VoterDto>
    {
        ILogger<VoterDomain> _logger;

        public VoterDomain(IRepository<Voter> repo, ILogger<VoterDomain> logger) : base(repo, logger)
        {
            _logger = logger;

        }

        public VoterDto Create(PersistVoterDto dto)
        {
            var entity = AsVoterDto(dto).AsEntity();
            entity.CreationDate = DateTime.Now.Ticks;

            var result = _repository.Create(entity);
            if (result != null)
            {
                return Get(result.Id);
            }
            else
            {
                return null;
            }
        }


        public VoterDto AsVoterDto(PersistVoterDto dto)
        {
            VoterDto returnMe = new VoterDto();

            returnMe.CreationDate = dto.CreationDate;
            returnMe.Groups = new List<GroupSummaryDto>();
            returnMe.User = null;
            returnMe.UserId = dto.UserId;

            return returnMe;
        }

    }
}
