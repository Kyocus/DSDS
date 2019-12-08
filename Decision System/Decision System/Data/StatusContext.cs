using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DecisionSystem.Models;

namespace DecisionSystem.Data
{
    public class StatusContext : DbContext
    {
        public StatusContext(DbContextOptions<StatusContext> options)
            : base(options)
        {
        }

        public DbSet<Status> Statuss { get; set; }
    }
}