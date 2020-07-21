using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{

    public class VoterDto : BaseDto<Voter>, IDto
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public long CreationDate { get; set; }

        public List<GroupSummaryDto> Groups { get; set; }

        public VoterDto()
        {

        }

        public override Voter AsEntity()
        {
            Voter returnMe = new Voter();

            returnMe.Id = Id;
            returnMe.Groups = null;
            returnMe.GroupVoters = null;
            returnMe.CreationDate = CreationDate;
            returnMe.FirstName = FirstName;
            returnMe.LastName = LastName;
            returnMe.MiddleName = MiddleName;
            returnMe.Address = Address;
            returnMe.City = City;
            returnMe.State = State;

            return returnMe;
        }
    }
}
