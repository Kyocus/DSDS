using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public class StatusDomain : Domain<Status, StatusDto>
    {
        ILogger<StatusDomain> _logger;

        public StatusDomain(IRepository<Status> repo, ILogger<StatusDomain> logger) : base(repo, logger)
        {
            _logger = logger;

        }
    }
}
