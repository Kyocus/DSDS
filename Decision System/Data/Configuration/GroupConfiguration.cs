using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class GroupConfiguration : IEntityTypeConfiguration<Group>
    {
        public void Configure(EntityTypeBuilder<Group> builder)
        {
            DateTimeOffset dto = new DateTimeOffset(DateTime.Now);

            builder.HasKey(o => o.Id);
            builder.Property(t => t.Name)
                    .IsRequired();

            builder.HasData(new
            {
                Id = 1l,
                Name = "name 1",
                Description = "description 1",
                ParentGroupId = 1l,
                parentGroupId = 1l,
                CreationDate = dto.ToUnixTimeSeconds()
            });

        }
    }
}
