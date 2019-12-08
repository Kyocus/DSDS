using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using DecisionSystem.Models;

namespace DecisionSystem.Data
{
    public class AttachmentContext : DbContext
    {
        public AttachmentContext(DbContextOptions<AttachmentContext> options)
            : base(options)
        {
        }

        public DbSet<Attachment> Attachments { get; set; }
    }
}