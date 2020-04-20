using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class GroupGroup 
    {

        public Group ParentGroup { get; set; }
        public long ParentGroupId { get ; set ; }

        public Group ChildGroup { get; set; }
        public long ChildGroupId { get ; set ; }

        public GroupGroup()
        {

        }
    }
}
