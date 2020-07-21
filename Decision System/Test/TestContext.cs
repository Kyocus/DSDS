using Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Test
{
    public partial class TestDataContext : DbContext
    {
        public TestDataContext()
        {

        }

        public TestDataContext(DbContextOptions<TestDataContext> options) : base(options)
        {

        }

        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Decision> Decisions { get; set; }
        public DbSet<Voter> Voters { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Vote> Votes { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }

}
