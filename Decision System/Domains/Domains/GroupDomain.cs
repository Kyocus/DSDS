using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Domains
{
    public class GroupDomain : Domain<Group, GroupDto>
    {
        ILogger<GroupDomain> _logger;

        IRepository<Voter> _voterRepository;

        public GroupDomain(IRepository<Group> repo, IRepository<Voter> voterRepo, ILogger<GroupDomain> logger) : base(repo, logger)
        {
            _voterRepository = voterRepo;
            _logger = logger;
        }

        public GroupDto Update(PersistGroupDto dto)
        {
            return Update(AsGroupDto(dto));
        }

        public GroupDto Create(PersistGroupDto dto)
        {
            return _repository.Create(AsGroupDto(dto).AsEntity()).AsDto();
        }

        public GroupDto AddVoter(int groupId, int voterId)
        {
            var group = _repository.FindById(groupId);
            var voter = _voterRepository.FindById(voterId);

            if ((group != null) &&
                (voter != null))
            {

                if (group.GroupVoters == null)
                {
                    group.GroupVoters = new List<GroupVoter>();
                }

                if (group.GroupVoters.FindIndex(x => x.VoterId == voterId) == -1)
                {
                    GroupVoter groupVoter = new GroupVoter();
                    groupVoter.VoterId = voterId;
                    groupVoter.Voter = voter;
                    groupVoter.GroupId = groupId;
                    groupVoter.Group = group;
                    group.GroupVoters.Add(groupVoter);
                }

                var result = _repository.Update(group);

                return result != null 
                    ? result.AsDto() 
                    : null;
            }
            else
            {
                return null;
            }
        }

        public Group AddGroup(int groupId, int childId)
        {
            //groupvoter insert?
            var group = _repository.FindById(groupId);
            var child = _repository.FindById(childId);

            if (group.ChildGroups == null)
            {
                group.ChildGroups = new List<GroupGroup>();
            }

            if (group.ChildGroups.FindIndex(x => x.ChildGroupId == childId) == -1)
            {
                GroupGroup groupGroup = new GroupGroup();
                groupGroup.ParentGroupId = groupId;
                groupGroup.ParentGroup = group;
                groupGroup.ChildGroupId = childId;
                groupGroup.ChildGroup = child;
                group.ChildGroups.Add(groupGroup);
            }

            return _repository.Update(group);
        }

        public GroupDto AsGroupDto(PersistGroupDto dto)
        {
            GroupDto returnMe = new GroupDto();

            returnMe.Id = dto.Id;
            returnMe.Name = dto.Name;
            returnMe.Description = dto.Description;

            returnMe.ParentGroups = dto.ParentGroups.Select(x => _repository.FindById(x).AsType<GroupSummaryDto>()).ToList();
            returnMe.ChildGroups = dto.ChildGroups.Select(x => _repository.FindById(x).AsType<GroupSummaryDto>()).ToList();
            returnMe.Voters = dto.Voters.Select(x => _voterRepository.FindById(x).AsDto()).ToList();

            return returnMe;
        }

        public List<GroupDto> GetAll()
        {
            return  _repository.FindAll()
                .Select(x => x.AsDto()).ToList();
            //return  _repository.FindAllAsync().Result
            //    .Select(x => x.AsDto()).ToList();
        }
    }
}
