using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Models
{
    public class Group : IAggregateRoot
    {
        private int id;
        private string name;
        private string description;
        private int parentGroupId;
        private long creationDate;

        public virtual Group ParentGroup { get; set; }
        public virtual List<Decision> Decisions { get; set; }
        //Groups or Entities
        public virtual List<object> Children { get; set; }
        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public int ParentGroupId { get => parentGroupId; set => parentGroupId = value; }
        public long CreationDate { get => creationDate; set => creationDate = value; }

        public Group(int id, string name, string description, int parentGroupId, long creationDate)
        {
            Id = id;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Description = description ?? throw new ArgumentNullException(nameof(description));
            ParentGroupId = parentGroupId;
            CreationDate = creationDate;
        }
    }
}
