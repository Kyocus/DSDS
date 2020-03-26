using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class VoterDto : BaseDto<Voter>, IDto
    {
        public List<GroupSummaryDto> Groups { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long CreationDate { get; set; }

        public VoterDto()
        {

        }

        public override Voter AsEntity() {
            Voter returnMe = new Voter();
            
            returnMe.Description = Description;
            returnMe.Name = Name;
            returnMe.Id = Id;
            returnMe.Groups = null;
            returnMe.GroupVoters = null;
            
            return returnMe;
        }
    }
}
