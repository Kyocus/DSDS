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
    public class GroupController : BaseController<Group, GroupDto>
    {
        public GroupController(ILogger<GroupController> logger, IRepository<Group> repository, IDomain<Group, GroupDto> domain) : base(logger, repository, domain)
        {
        }

        [HttpGet]
        public override ActionResult<IEnumerable<GroupDto>> GetAll()
        {
            try
            {
                var result = ((GroupDomain)_domain).GetAll();
                return CreatedAtAction("Post", result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public ActionResult<GroupDto> Post(PersistGroupDto dto)
        {
            try
            {
                var result = ((GroupDomain)_domain).Create(dto);
                return CreatedAtAction("Post", result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [NonAction]
        public override ActionResult<GroupDto> Post(GroupDto dto)
        {
            throw new NotImplementedException();
        }

        [NonAction]
        public override Task<GroupDto> Put(GroupDto dto)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        public async Task<ActionResult<GroupDto>> Put(PersistGroupDto dto)
        {
            var dom = (GroupDomain)_domain;

            try
            {
                var result = dom.UpdateAsync(dom.AsGroupDto(dto));
                return CreatedAtAction("Post", result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [HttpPut]
        [Route("{groupId}/AddVoter/{voterId}")]
        public async Task<ActionResult<GroupDto>> AddVoter(int groupId, int voterId)
        {
            try
            {
                var result = ((GroupDomain)_domain).AddVoter(groupId, voterId);
                return CreatedAtAction("Post", result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [HttpPut]
        [Route("{groupId}/AddGroup/{childId}")]
        public async Task<ActionResult<GroupDto>> AddGroup(long groupId, long childId)
        {
            try
            {
                var result = ((GroupDomain)_domain).AddGroup(groupId, childId).AsType<GroupDto>();
                return CreatedAtAction("Post", result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public override void Delete(int id)
        {
            _domain.Delete(id);
        }

        [HttpGet]
        [Route("User/{id}")]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetByUserId(long id)
        {
            try
            {
                var result = ((GroupDomain)_domain).GetByUserId(id);
                return CreatedAtAction("Post", result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

        [HttpGet]
        [Route("Find/{query}")]
        public async Task<ActionResult<IEnumerable<GroupDto>>> GetByQuery(string query)
        {
            try
            {
                var result = ((GroupDomain)_domain).Query(query);
                return CreatedAtAction("Post", result);
            }
            catch (Exception e)
            {
                return NotFound();
            }
        }

    }
}
