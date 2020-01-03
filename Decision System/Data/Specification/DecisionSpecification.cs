using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Repository
{
    public class AttachmentSpecification : BaseSpecification<Attachment>
    {
        public AttachmentSpecification(int id)
            : base(b => b.Id == id)
        {
            AddInclude(b => b);
        }
    }
}
