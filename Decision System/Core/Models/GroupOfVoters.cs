using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class GroupOfVoters : Group
    {
        private List<int> VoterIds;

        public virtual List<Voter> Voters { get; set; }
        public List<int> VoterIds1 { get => VoterIds; set => VoterIds = value; }

        public GroupOfVoters()
        {

        }
    }
}
