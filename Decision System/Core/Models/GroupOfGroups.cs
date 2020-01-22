using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class GroupOfGroups : Group
    {
        private List<long> GroupIds;

        public virtual List<Group> Groups { get; set; }
        public List<long> GroupIds1 { get => GroupIds; set => GroupIds = value; }

        public GroupOfGroups()
        {

        }
    }
}
