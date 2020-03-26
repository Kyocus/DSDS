using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class PersistGroupDto : BaseDto<Group>, IDto
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public List<int> ParentGroups { get; set; }
        public List<int> ChildGroups { get; set; }
        public List<int> Voters { get; set; }

        public PersistGroupDto()
        {

        }
    }
}
