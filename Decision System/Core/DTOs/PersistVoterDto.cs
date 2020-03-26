using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class PersistVoterDto : BaseDto<Voter>, IDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public long CreationDate { get; set; }

        public PersistVoterDto()
        {

        }
    }
}
