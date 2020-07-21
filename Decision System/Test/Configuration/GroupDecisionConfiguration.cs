using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class GroupDecisionConfiguration : IEntityTypeConfiguration<GroupDecision>
    {
        public void Configure(EntityTypeBuilder<GroupDecision> builder)
        {
            builder.HasKey(gd => new { gd.GroupId, gd.DecisionId});

            builder.HasOne(gd => gd.Group)
                .WithMany(g => g.Decisions);
        }
    }
}
