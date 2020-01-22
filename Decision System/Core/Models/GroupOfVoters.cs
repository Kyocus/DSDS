using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class GroupOfVoters : Group
    {
        private List<long> voterIds;

        public virtual List<Voter> Voters { get; set; }
        public List<long> VoterIds { get => voterIds; set => voterIds = value; }

        public GroupOfVoters()
        {

        }
    }
}
