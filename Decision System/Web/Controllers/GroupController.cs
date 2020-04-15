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
        public override IEnumerable<GroupDto> GetAll()
        {
            return ((GroupDomain)_domain).GetAll();
        }

        [HttpPost]
        public GroupDto Post(PersistGroupDto dto)
        {
            return ((GroupDomain)_domain).Create(dto);
        }

        [NonAction]
        public override GroupDto Post(GroupDto dto)
        {
            throw new NotImplementedException();
        }

        [NonAction]
        public override Task<GroupDto> Put(GroupDto dto)
        {
            throw new NotImplementedException();
        }

        [HttpPut]
        public Task<GroupDto> Put(PersistGroupDto dto)
        {
            var dom = (GroupDomain)_domain;

            return dom.UpdateAsync(dom.AsGroupDto(dto));
        }

        [HttpPut]
        [Route("{groupId}/AddVoter/{voterId}")]
        public GroupDto AddVoter(int groupId, int voterId)
        {
            return ((GroupDomain)_domain).AddVoter(groupId, voterId);
        }

        [HttpPut]
        [Route("{groupId}/AddGroup/{childId}")]
        public GroupDto AddGroup(int groupId, int childId)
        {
            return ((GroupDomain)_domain).AddGroup(groupId, childId).AsType<GroupDto>();
        }

        [HttpDelete]
        [Route("{id}")]
        public override void Delete(int id)
        {
            _domain.Delete(id);
        }

        [HttpGet]
        [Route("User/{id}")]
        public IEnumerable<GroupDto> GetByUserId(long id)
        {
            return ((GroupDomain)_domain).GetByUserId(id);
        }

        [HttpGet]
        [Route("Find/{query}")]
        public IEnumerable<GroupDto> GetByQuery(string query)
        {
            return ((GroupDomain)_domain).Query(query);
        }

    }
}
