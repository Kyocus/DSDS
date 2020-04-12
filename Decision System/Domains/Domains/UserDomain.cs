using Core.Interfaces;
using Core.Models;
using DecisionSystem.Repository;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Core.Domains
{
    public class UserDomain : Domain<User, UserDto>
    {
        ILogger<UserDomain> _logger;

        public UserDomain(IRepository<User> repo, ILogger<UserDomain> logger) : base(repo, logger)
        {
            _logger = logger;

        }

        public override UserDto Create(UserDto dto)
        {
            return _repository.Create(dto.AsEntity()).AsDto();
        }

        public List<UserDto> GetUsersByName(string query)
        {
            return ((UserRepository)_repository)
                .FindByName(query)
                .Select(x => x.AsDto())
                .ToList();
        }
    }
}
