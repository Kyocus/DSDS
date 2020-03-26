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
            return EntityAsDto(_repository.Create(DtoAsEntity(AsVoterDto(dto))));
        }

        public Voter DtoAsEntity(VoterDto dto)
        {
            Voter returnMe = new Voter();

            returnMe.Description = dto.Description;
            returnMe.CreationDate = dto.CreationDate;
            returnMe.Id = dto.Id;
            returnMe.Name = dto.Name;

            returnMe.GroupVoters = null;

            return returnMe;
        }

        public VoterDto EntityAsDto(Voter entity)
        {
            VoterDto returnMe = new VoterDto();

            returnMe.Description = entity.Description;
            returnMe.CreationDate = entity.CreationDate;
            returnMe.Id = entity.Id;
            returnMe.Name = entity.Name;
            returnMe.Groups = entity.Groups
            .Select((Group x) =>
            {
                GroupSummaryDto returnMe = new GroupSummaryDto();

                returnMe.Description = x.Description;
                returnMe.Id = x.Id;
                returnMe.Name = x.Name;

                return returnMe;

            }).ToList();

            return returnMe;
        }


        public VoterDto AsVoterDto(PersistVoterDto dto)
        {
            VoterDto returnMe = new VoterDto();

            returnMe.Name = dto.Name;
            returnMe.Description = dto.Description;
            returnMe.CreationDate = dto.CreationDate;

            returnMe.Groups = null;

            return returnMe;
        }

    }
}
