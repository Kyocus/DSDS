using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DecisionSystem.Models;

namespace DecisionSystem.Data
{
    public class GroupContext : DbContext
    {
        public GroupContext(DbContextOptions<GroupContext> options)
            : base(options)
        {
        }

        public DbSet<Group> Groups { get; set; }
    }
}