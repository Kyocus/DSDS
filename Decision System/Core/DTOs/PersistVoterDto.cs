using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class PersistVoterDto : BaseDto<Voter>, IDto
    {
        public long CreationDate { get; set; }
        public long UserId { get; set; }

        public PersistVoterDto()
        {

        }
    }
}
