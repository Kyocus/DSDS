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
    public class StatusRepository : Repository<Status, StatusDto>, IStatusRepository
    {
        public StatusRepository(DbContext context, ILogger<Status> logger) : base(context, logger)
        {
                
        }
    }
}
