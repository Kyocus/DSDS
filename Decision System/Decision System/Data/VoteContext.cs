using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DecisionSystem.Models;

namespace DecisionSystem.Data
{
    public class VoteContext : DbContext
    {
        public VoteContext(DbContextOptions<VoteContext> options)
            : base(options)
        {
        }

        public DbSet<Vote> Votes { get; set; }
    }
}