using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public class CommentDomain : Domain<Comment, CommentDto>
    {
        ILogger<CommentDomain> _logger;

        public CommentDomain(IRepository<Comment> repo, ILogger<CommentDomain> logger) : base(repo, logger)
        {
            _logger = logger;
        }
    }
}
