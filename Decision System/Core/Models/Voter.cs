using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Voter : BaseModel<VoterDto>, IAggregateRoot
    {
        private string name;
        private string description;
        private long creationDate;


        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public long CreationDate { get => creationDate; set => creationDate = value; }
        public List<Group> Groups { get; set; }
        public List<GroupVoter> GroupVoters { get; set; }

        public Voter()
        {
            Groups = new List<Group>();
            GroupVoters = new List<GroupVoter>();
        }
        public Voter(int id, string name, string description, long creationDate)
        {
            Id = id;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Description = description ?? throw new ArgumentNullException(nameof(description));
            CreationDate = creationDate;
        }

        public override VoterDto AsDto()
        {
            VoterDto returnMe = new VoterDto();

            returnMe.Id = this.Id;
            returnMe.Name = this.Name;
            returnMe.Description = this.Description;
            returnMe.CreationDate = this.CreationDate;
            returnMe.Groups = this.Groups.Select(x =>
            {
                var r = new GroupSummaryDto();
                r.Id = x.Id;
                r.Description = x.Description;
                r.Name = x.Name;

                return r;
            }).ToList();

            return returnMe;
        }

    }
}
