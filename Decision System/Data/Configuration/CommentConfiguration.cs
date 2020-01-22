using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(t => t.Time)
                    .IsRequired();

            builder.HasData(new
            {
                Id = 1l,
                EntityId = 1l,
                entityId = 1l,
                Upvotes = 0,
                Downvotes = 0,
                Time = DateTime.UtcNow.Ticks
            });

        }
    }
}
