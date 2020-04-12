using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DecisionSystem.Data;
using Core.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DecisionSystem.Repository;
using Core.Interfaces;
using Core.Domains;

namespace DecisionSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : BaseController<User, UserDto>
    {

        public UserController(ILogger<UserController> logger, IRepository<User> repository, IDomain<User, UserDto> domain) : base(logger, repository, domain)
        {
        }

        [HttpGet]
        [Route("Find/{query}")]
        public List<UserDto> GetUsersByName(string query) {
            return ((UserDomain)_domain).GetUsersByName(query);
        }

    }
}
