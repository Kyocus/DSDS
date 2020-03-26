using Core.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public class VoteDto : BaseDto<Vote>, IDto
    {
        public virtual Voter Entity { get; set; }
        public long Time { get; set; }

        public long EntityId { get; set; }
        public long OptionId { get; set; }

        public VoteDto()
        {

        }
    }
}