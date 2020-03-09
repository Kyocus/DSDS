using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class GroupVoterConfiguration : IEntityTypeConfiguration<GroupVoter>
    {
        public void Configure(EntityTypeBuilder<GroupVoter> builder)
        {
            builder.HasKey(gv => new { gv.GroupId, gv.VoterId});

            builder.HasOne(gv => gv.Group)
                .WithMany(g => g.Voters);
        }
    }
}
