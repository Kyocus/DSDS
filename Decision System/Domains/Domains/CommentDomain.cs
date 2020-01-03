using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public class CommentDomain : Domain<Comment>
    {
        public CommentDomain(IRepository<Comment> repo) : base(repo)
        {

        }
    }
}
