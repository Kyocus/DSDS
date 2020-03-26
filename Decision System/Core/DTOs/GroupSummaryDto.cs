using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class GroupSummaryDto : BaseDto<Group>, IDto
    {
        public string Name { get; set; }
        public string Description { get; set; }


        public GroupSummaryDto()
        {

        }
    }
}
