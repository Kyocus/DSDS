using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class DecisionConfiguration : IEntityTypeConfiguration<Decision>
    {
        public void Configure(EntityTypeBuilder<Decision> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(t => t.Name).IsRequired();
            builder.Property(t => t.ExpirationDate).IsRequired();
            builder.Property(t => t.CreationDate).IsRequired();
            //builder.Property(t => t.Options).IsRequired();
            builder.Property(t => t.StatusId).IsRequired();
            builder.Property(t => t.Name).IsRequired();

            builder.HasOne(t => t.Status);

            builder.HasData(new
            {
                Id = 4,
                CreationDate = DateTime.UtcNow.Ticks,
                Description = "description",
                ExpirationDate = DateTime.UtcNow.Ticks,
                Name = "name",
                StatusId = 1,
                statusId = 1,
                StatusDate = DateTime.UtcNow.Ticks
            });

        }
    }
}
