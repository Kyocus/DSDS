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

            builder.HasData(new { Id = 1, EntityId = 1, SelectedOption = 1, Time = DateTime.UtcNow.Ticks });
            builder.HasData(new { Id = 2, EntityId = 2, SelectedOption = 1, Time = DateTime.UtcNow.Ticks });
            builder.HasData(new { Id = 3, EntityId = 3, SelectedOption = 1, Time = DateTime.UtcNow.Ticks });
            builder.HasData(new { Id = 4, EntityId = 1, SelectedOption = 2, Time = DateTime.UtcNow.Ticks });
            builder.HasData(new { Id = 5, EntityId = 2, SelectedOption = 3, Time = DateTime.UtcNow.Ticks });
            builder.HasData(new { Id = 7, EntityId = 7, SelectedOption = 1, Time = DateTime.UtcNow.Ticks });

        }
    }
}
