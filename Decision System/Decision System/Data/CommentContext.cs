using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DecisionSystem.Models;

namespace DecisionSystem.Data
{
    public class CommentContext : DbContext
    {
        public CommentContext(DbContextOptions<CommentContext> options)
            : base(options)
        {
        }

        public DbSet<Comment> Comments { get; set; }
    }
}