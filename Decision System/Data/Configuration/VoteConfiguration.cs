using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class VoteConfiguration : IEntityTypeConfiguration<Vote>
    {
        public void Configure(EntityTypeBuilder<Vote> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(t => t.Time)
                    .IsRequired();

            builder.HasData(new { Id = 1l, EntityId = 1l, OptionId = 1l, Time = DateTime.UtcNow.Ticks });
            builder.HasData(new { Id = 2l, EntityId = 2l, OptionId = 1l, Time = DateTime.UtcNow.Ticks });
            builder.HasData(new { Id = 3l, EntityId = 3l, OptionId = 1l, Time = DateTime.UtcNow.Ticks });
            builder.HasData(new { Id = 4l, EntityId = 1l, OptionId = 2l, Time = DateTime.UtcNow.Ticks });
            builder.HasData(new { Id = 5l, EntityId = 2l, OptionId = 3l, Time = DateTime.UtcNow.Ticks });
            builder.HasData(new { Id = 7l, EntityId = 7l, OptionId = 1l, Time = DateTime.UtcNow.Ticks });

        }
    }
}
