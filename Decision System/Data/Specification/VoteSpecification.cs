using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Repository
{
    public class VoteSpecification : BaseSpecification<Vote>
    {
        public VoteSpecification(int id)
            : base(b => b.Id == id)
        {
            AddInclude(b => b);
        }
    }
}
