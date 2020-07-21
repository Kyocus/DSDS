using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class StatusConfiguration : IEntityTypeConfiguration<Status>
    {
        public void Configure(EntityTypeBuilder<Status> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(t => t.Name)
                    .IsRequired();

            builder.HasData(new { Id = 1l, Name = "status 1"});
            builder.HasData(new { Id = 2l, Name = "status 2"});
            builder.HasData(new { Id = 3l, Name = "status 3"});
            builder.HasData(new { Id = 4l, Name = "status 4"});

        }
    }
}
