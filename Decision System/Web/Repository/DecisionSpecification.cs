using DecisionSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Repository
{
    public class DecisionSpecification : BaseSpecification<Decision>
    {
        public DecisionSpecification(int id)
            : base(b => b.Id == id)
        {
            AddInclude(b => b.Items);
        }
        public DecisionSpecification(string id)
            : base(b => b.Id == id)
        {
            AddInclude(b => b.Items);
        }
    }
}
