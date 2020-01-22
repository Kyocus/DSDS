using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class VoterConfiguration : IEntityTypeConfiguration<Voter>
    {
        public void Configure(EntityTypeBuilder<Voter> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(t => t.Name)
                    .IsRequired();


            builder.HasData(new { Id = 1l, Name = "Name 1", Description = "description 1", CreationDate = DateTime.UtcNow.Ticks});
            builder.HasData(new { Id = 8l, Name = "Name 8", Description = "description 8", CreationDate = DateTime.UtcNow.Ticks});
            builder.HasData(new { Id = 7l, Name = "Name 7", Description = "description 7", CreationDate = DateTime.UtcNow.Ticks});
            builder.HasData(new { Id = 6l, Name = "Name 6", Description = "description 6", CreationDate = DateTime.UtcNow.Ticks});
            builder.HasData(new { Id = 5l, Name = "Name 5", Description = "description 5", CreationDate = DateTime.UtcNow.Ticks});
            builder.HasData(new { Id = 4l, Name = "Name 4", Description = "description 4", CreationDate = DateTime.UtcNow.Ticks});
            builder.HasData(new { Id = 3l, Name = "Name 3", Description = "description 3", CreationDate = DateTime.UtcNow.Ticks});
            builder.HasData(new { Id = 2l, Name = "Name 2", Description = "description 2", CreationDate = DateTime.UtcNow.Ticks});
        }
    }
}
