using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class GroupDto : BaseDto<Group>, IDto
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public List<DecisionDto> Decisions { get; set; }
        public List<GroupSummaryDto> ParentGroups { get; set; }
        public List<GroupSummaryDto> ChildGroups { get; set; }
        public List<VoterDto> Voters { get; set; }
        public long CreationDate { get; set; }

        public GroupDto()
        {

        }

        public override Group AsEntity()
        {
            var returnMe = new Group();

            returnMe.ChildGroups = new List<GroupGroup>();
            returnMe.GroupVoters = new List<GroupVoter>();
            returnMe.Decisions = new List<GroupDecision>();
            returnMe.ParentGroups = new List<GroupGroup>();
            
            returnMe.CreationDate = CreationDate;
            returnMe.Description = Description;
            returnMe.Id = Id;
            returnMe.Name = Name;

            return returnMe;
        }
    }
}
