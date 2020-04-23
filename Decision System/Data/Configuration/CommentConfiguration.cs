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
            DateTimeOffset dto = new DateTimeOffset(DateTime.Now);
            
            builder.Property(t => t.Time)
                    .IsRequired();

            builder.HasData(new
            {
                Id = 1l,
                VoterId = 1l,
                Time = dto.ToUnixTimeSeconds()
            });

        }
    }
}
