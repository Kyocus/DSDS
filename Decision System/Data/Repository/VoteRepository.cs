using Core.Interfaces;
using Core.Models;
using DecisionSystem.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Repository
{
    public class VoteRepository : Repository<Vote>, IVoteRepository
    {
        public VoteRepository(DbContext context, ILogger<Vote> logger) : base(context, logger)
        {

        }
    }
}
