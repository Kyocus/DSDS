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
            DateTimeOffset dto = new DateTimeOffset(DateTime.Now);

            builder.HasKey(o => o.Id);
            builder.Property(t => t.Time)
                    .IsRequired();

            builder.HasData(new { Id = 1l, VoterId = 1l, OptionId = 1l, Time = dto.ToUnixTimeSeconds() });
            builder.HasData(new { Id = 2l, VoterId = 2l, OptionId = 1l, Time = dto.ToUnixTimeSeconds() });
            builder.HasData(new { Id = 3l, VoterId = 3l, OptionId = 1l, Time = dto.ToUnixTimeSeconds() });
            builder.HasData(new { Id = 4l, VoterId = 1l, OptionId = 2l, Time = dto.ToUnixTimeSeconds() });
            builder.HasData(new { Id = 5l, VoterId = 2l, OptionId = 3l, Time = dto.ToUnixTimeSeconds() });
            builder.HasData(new { Id = 7l, VoterId = 7l, OptionId = 1l, Time = dto.ToUnixTimeSeconds() });

        }
    }
}
