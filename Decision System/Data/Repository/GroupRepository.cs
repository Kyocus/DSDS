using Core.Interfaces;
using Core.Models;
using DecisionSystem.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Repository
{
    public class GroupRepository : Repository<Group, GroupDto>, IGroupRepository
    {
        public GroupRepository(DbContext context, ILogger<Group> logger) : base(context, logger)
        {

        }



        public override IQueryable<Group> FindAll()
        {
            return this.context.Set<Group>()
                .Include(g => g.GroupVoters)
                .ThenInclude(gv => gv.Voter)
                .Include(g => g.ChildGroups)
                .Include(g => g.ParentGroups);
        }

    }
}
