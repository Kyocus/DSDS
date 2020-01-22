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
    public class DecisionRepository : Repository<Decision>, IDecisionRepository
    {
        public DecisionRepository(DbContext context, ILogger<Decision> logger) : base(context, logger)
        {

        }
    }
}
