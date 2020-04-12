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
    public class UserRepository : Repository<User, UserDto>, IUserRepository
    {
        public UserRepository(DbContext context, ILogger<User> logger) : base(context, logger)
        {

        }

        public IQueryable<User> FindByName(string name)
        {
            return from u in context.Set<User>()
            where EF.Functions.Like(u.FirstName.ToLower(), "%" + name.ToLower() + "%")
            || EF.Functions.Like(u.LastName.ToLower(), "%" + name.ToLower() + "%")
            || EF.Functions.Like(u.MiddleName.ToLower(), "%" + name.ToLower() + "%")
            select u;
        }
    }
}
