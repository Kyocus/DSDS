using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public class StatusDomain : Domain<Status>
    {
        public StatusDomain(IRepository<Status> repo) : base(repo)
        {

        }
    }
}
