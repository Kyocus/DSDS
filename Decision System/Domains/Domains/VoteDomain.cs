using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public class VoteDomain : Domain<Vote>
    {
        public VoteDomain(IRepository<Vote> repo) : base(repo)
        {

        }
    }
}
