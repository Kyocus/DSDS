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
    public class CommentController : BaseController<Comment, CommentDto>
    {

        public CommentController(ILogger<CommentController> logger, IRepository<Comment> repository, IDomain<Comment, CommentDto> domain) : base(logger, repository, domain)
        {
        }

        //[HttpGet]
        //public IEnumerable<Comment> Get()
        //{
        //    List<Comment> entities = new List<Comment>();
        //    entities.Add(new Comment(DateTime.UtcNow.Ticks, 1));

        //    return entities;
        //}
    }
}
