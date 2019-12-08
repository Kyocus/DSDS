using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DecisionSystem.Models;

namespace DecisionSystem.Data
{
    public class DecisionContext : DbContext
    {
        public DecisionContext(DbContextOptions<DecisionContext> options)
            : base(options)
        {
        }

        public DbSet<Decision> Decisions { get; set; }
    }
}