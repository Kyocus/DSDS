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
    public class AttachmentController : BaseController<Attachment, AttachmentDto>
    {
        public AttachmentController(ILogger<AttachmentController> logger, IRepository<Attachment> repository, IDomain<Attachment, AttachmentDto> domain) : base(logger, repository, domain)
        {
        }

        //[HttpGet]
        //public IEnumerable<Attachment> Get()
        //{
        //    List<Attachment> entities = new List<Attachment>();
        //    entities.Add(new Attachment("name 1", "path", DateTime.UtcNow.Ticks, 1));

        //    return entities;
        //}
    }
}
