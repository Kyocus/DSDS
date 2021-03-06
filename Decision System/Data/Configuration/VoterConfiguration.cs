﻿using Core.Models;
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
            DateTimeOffset dto = new DateTimeOffset(DateTime.Now);

            builder.HasKey(o => o.Id);

            builder.HasData(new { Id = 1l, UserId = 1l, CreationDate = dto.ToUnixTimeSeconds()});
            builder.HasData(new { Id = 8l, UserId = 2l, CreationDate = dto.ToUnixTimeSeconds()});
            builder.HasData(new { Id = 7l, UserId = 3l, CreationDate = dto.ToUnixTimeSeconds()});
            builder.HasData(new { Id = 6l, UserId = 4l, CreationDate = dto.ToUnixTimeSeconds() });
        }
    }
}
