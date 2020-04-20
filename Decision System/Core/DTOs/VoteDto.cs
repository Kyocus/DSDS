using Core.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public class VoteDto : BaseDto<Vote>, IDto
    {
        public virtual VoterDto Voter { get; set; }
        public long Time { get; set; }

        public long VoterId { get; set; }
        public long OptionId { get; set; }

        public VoteDto()
        {

        }
    }
}