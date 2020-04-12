using Core.Models;
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
            AddInclude(b => b.Attachments);
            AddInclude(b => b.Comments);
            AddInclude(b => b.GroupDecisions);
            AddInclude(b => b.Options);
            AddInclude(b => b.Votes);
        }
        public DecisionSpecification(string id)
            : base(b => b.Id.ToString() == id)
        {
            AddInclude(b => b.Attachments);
            AddInclude(b => b.Comments);
            AddInclude(b => b.GroupDecisions);
            AddInclude(b => b.Options);
            AddInclude(b => b.Votes);
        }
    }
}
