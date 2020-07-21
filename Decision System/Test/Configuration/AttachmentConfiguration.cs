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
            DateTimeOffset dto = new DateTimeOffset(DateTime.Now);

            builder.Property(t => t.Name)
                    .IsRequired();

            builder.HasData(new
            {
                Id = 1L,
                Name = "filename",
                Path = "attachments/filename.jpg",
                UploaderId = 1L,
                uploaderId = 1L,
                OptionId = 1L,
                optionId = 1L,
                UploadDate = dto.ToUnixTimeSeconds()
            });

        }
    }
}
