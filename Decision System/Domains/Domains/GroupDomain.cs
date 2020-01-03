using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public class GroupDomain : Domain<Group>
    {
        public GroupDomain(IRepository<Group> repo) : base(repo)
        {

        }
    }
}
