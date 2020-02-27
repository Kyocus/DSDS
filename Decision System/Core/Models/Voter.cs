using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Voter : BaseModel, IAggregateRoot
    {
        private string name;
        private string description;
        private long creationDate;
        
        
        public virtual List<Group> Groups { get; set; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public long CreationDate { get => creationDate; set => creationDate = value; }
        public List<GroupVoter> GroupVoters { get; set; }

        public Voter()
        {

        }
        public Voter(int id, string name, string description, long creationDate)
        {
            Id = id;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Description = description ?? throw new ArgumentNullException(nameof(description));
            CreationDate = creationDate;
        }
    }
}
