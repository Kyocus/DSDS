using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Group : BaseModel, IAggregateRoot
    {
        private string name;
        private string description;
        private long creationDate;

        public virtual List<GroupDecision> Decisions { get; set; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }

        public List<GroupGroup> ParentGroups { get; set; }
        public List<GroupGroup> ChildGroups { get; set; }
        public List<GroupVoter> Voters { get; set; }
        public long CreationDate { get => creationDate; set => creationDate = value; }

        public Group()
        {

        }
    }
}
