using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Repository
{
    public class VoterSpecification : BaseSpecification<Voter>
    {
        public VoterSpecification(int id)
            : base(b => b.Id == id)
        {
            AddInclude(b => b);
        }
    }
}
