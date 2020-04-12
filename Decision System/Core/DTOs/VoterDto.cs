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
        public long CreationDate { get; set; }
        public long UserId { get; set; }
        public UserDto User { get; set; }


        public VoterDto()
        {

        }

        public override Voter AsEntity() {
            Voter returnMe = new Voter();
            
            returnMe.Id = Id;
            returnMe.UserId = UserId;
            if (User != null) { 
                returnMe.User = User.AsEntity();
            }
            returnMe.Groups = null;
            returnMe.GroupVoters = null;
            returnMe.CreationDate = CreationDate;
            
            return returnMe;
        }
    }
}
