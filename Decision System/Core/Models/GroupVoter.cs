using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class GroupVoter
    {
        public Group Group { get; set; }
        public int GroupId { get; set; }

        public Voter Voter { get; set; }
        public int VoterId { get; set; }

        public GroupVoter()
        {

        }
    }
}
