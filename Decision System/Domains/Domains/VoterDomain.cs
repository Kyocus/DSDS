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
            DateTimeOffset time = new DateTimeOffset(DateTime.Now);
            var entity = AsVoterDto(dto).AsEntity();
            entity.CreationDate = time.ToUnixTimeSeconds();

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
            returnMe.Id = dto.Id;
            returnMe.FirstName = dto.FirstName;
            returnMe.MiddleName = dto.MiddleName;
            returnMe.LastName = dto.LastName;
            returnMe.Address = dto.Address;
            returnMe.City = dto.City;
            returnMe.State = dto.State;
            returnMe.Zip = dto.Zip;

            return returnMe;
        }

    }
}
