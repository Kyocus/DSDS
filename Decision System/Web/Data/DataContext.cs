using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Core.Models;

namespace DecisionSystem.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Decision> Decisions { get; set; }
        public DbSet<Voter> Entities { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Vote> Votes { get; set; }
    }
}