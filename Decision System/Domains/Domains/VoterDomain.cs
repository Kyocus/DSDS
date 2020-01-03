using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public class VoterDomain : Domain<Voter>
    {
        public VoterDomain(IRepository<Voter> repo) : base(repo)
        {

        }
    }
}
