using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public class AttachmentDomain : Domain<Attachment>
    {
        public AttachmentDomain(IRepository<Attachment> repo) : base(repo)
        {
        }
    }
}
