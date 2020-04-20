using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Group : BaseModel<GroupDto>, IAggregateRoot
    {
        private string name;
        private string description;
        private long creationDate;

        public virtual List<GroupDecision> Decisions { get; set; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }

        public List<GroupGroup> ParentGroups { get; set; }
        public List<GroupGroup> ChildGroups { get; set; }
        public List<GroupVoter> GroupVoters { get; set; }
        public long CreationDate { get => creationDate; set => creationDate = value; }

        public Group()
        {
            ParentGroups = new List<GroupGroup>();
            ChildGroups = new List<GroupGroup>();
            GroupVoters = new List<GroupVoter>();
        }


        public override GroupDto AsDto()
        {
            GroupDto returnMe = new GroupDto();

            returnMe.Description = Description;
            returnMe.CreationDate = CreationDate;
            returnMe.Id = Id;
            returnMe.Name = Name;

            if (Decisions != null)
            {
                returnMe.Decisions = Decisions.Select(x => x.Decision.AsDto()).ToList();
            }
            if (ParentGroups != null)
            {
                returnMe.ParentGroups = ParentGroups.Select(x => x.ParentGroup.AsType<GroupSummaryDto>()).ToList();
            }
            if (ChildGroups != null)
            {
                returnMe.ChildGroups = ChildGroups.Select(x => x.ChildGroup.AsType<GroupSummaryDto>()).ToList();
            }
            if (GroupVoters != null)
            {
                returnMe.Voters = GroupVoters.Select(x => x.Voter.AsDto()).ToList();
            }

            return returnMe;
        }
    }
}