using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DecisionSystem.Data;
using DecisionSystem.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace DecisionSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EntityController : ControllerBase
    {
        private readonly ILogger<EntityController> _logger;

        public EntityController(ILogger<EntityController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Entity> Get()
        {
            List<Entity> entities = new List<Entity>();
            entities.Add(new Entity(1, "First", "the first entity", DateTime.UtcNow.Ticks));
            entities.Add(new Entity(2, "Second", "the second entity", DateTime.UtcNow.Ticks));
            entities.Add(new Entity(3, "Third", "the third entity", DateTime.UtcNow.Ticks));
            entities.Add(new Entity(4, "Fourth", "the fourth entity", DateTime.UtcNow.Ticks));

            return entities;
        }
    }
}
