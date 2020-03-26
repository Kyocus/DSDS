using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public class AttachmentDomain : Domain<Attachment, AttachmentDto>
    {
        ILogger<AttachmentDomain> _logger;
        public AttachmentDomain(IRepository<Attachment> repo, ILogger<AttachmentDomain> logger) : base(repo, logger)
        {
            _logger = logger;
        }
    }
}
