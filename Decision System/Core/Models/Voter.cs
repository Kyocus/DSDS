using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Voter : BaseModel<VoterDto>, IAggregateRoot
    {
        private string name;
        private string description;
        private long creationDate;

        [Required]
        public User User { get; set; }
        [Required]
        public long UserId { get; set; }
        public long CreationDate { get => creationDate; set => creationDate = value; }
        public List<Group> Groups { get; set; }
        public List<GroupVoter> GroupVoters { get; set; }

        public Voter()
        {
            Groups = new List<Group>();
            GroupVoters = new List<GroupVoter>();
        }

        public override VoterDto AsDto()
        {
            VoterDto returnMe = new VoterDto();

            returnMe.Id = Id;
            returnMe.UserId = UserId;
            if (User != null)
            {
                returnMe.User = User.AsDto();
            }
            returnMe.CreationDate = CreationDate;

            if (Groups != null)
            {
                returnMe.Groups = Groups.Select(x =>
                {
                    var r = new GroupSummaryDto();
                    r.Id = x.Id;
                    r.Description = x.Description;
                    r.Name = x.Name;

                    return r;
                }).ToList();
            }

            return returnMe;
        }

    }
}
