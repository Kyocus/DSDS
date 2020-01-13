using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class OptionConfiguration : IEntityTypeConfiguration<Option>
    {
        public void Configure(EntityTypeBuilder<Option> builder)
        {
            List<int> attachmentIds = new List<int>();
            attachmentIds.Add(1);


            builder.HasKey(o => o.Id);
            builder.Property(t => t.Name)
                    .IsRequired();



            builder.HasData(new
            {
                Id = 1,
                Name = "Option1",
                Description = "Option1",
            });

        }
    }
}
