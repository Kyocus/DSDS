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
                Id = 1,
                Name = "filename",
                Path = "attachments/filename.jpg",
                UploaderId = 1,
                uploaderId = 1,
                OptionId = 1,
                optionId = 1,
                UploadDate = DateTime.UtcNow.Ticks
            });

        }
    }
}
