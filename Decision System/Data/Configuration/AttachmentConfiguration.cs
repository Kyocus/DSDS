using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class AttachmentConfiguration : IEntityTypeConfiguration<Attachment>
    {
        public void Configure(EntityTypeBuilder<Attachment> builder)
        {
            builder.HasKey(o => o.Id);
            builder.Property(t => t.Name)
                    .IsRequired();

            builder.HasData(new
            {
                Id = 1l,
                Name = "filename",
                Path = "attachments/filename.jpg",
                UploaderId = 1l,
                uploaderId = 1l,
                OptionId = 1l,
                optionId = 1l,
                UploadDate = DateTime.UtcNow.Ticks
            });

        }
    }
}
