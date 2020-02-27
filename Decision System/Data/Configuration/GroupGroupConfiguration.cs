using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class GroupGroupConfiguration : IEntityTypeConfiguration<GroupGroup>
    {
        public void Configure(EntityTypeBuilder<GroupGroup> builder)
        {
            builder.HasKey(gg => new { gg.ParentGroupId, gg.ChildGroupId });
            builder.HasOne(gg => gg.ParentGroup)
                .WithMany(pg => pg.ChildGroups);

            builder.HasOne(gg => gg.ChildGroup)
                .WithMany(pg => pg.ParentGroups);
        }
    }
}
