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
    public class VoterRepository : Repository<Voter>, IVoterRepository
    {
        public VoterRepository(DbContext context, ILogger<Voter> logger) : base(context, logger)
        {

        }
    }
}
