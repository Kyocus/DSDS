using Core.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public class Vote : BaseModel<VoteDto>, IAggregateRoot
    {
        private long time;
        private long voterId;
        private long optionId;

        [ForeignKey("EntityId")]
        public virtual Voter Voter { get; set; }
        public long Time { get => time; set => time = value; }
        
        [Required]
        public long VoterId { get => voterId; set => voterId = value; }
        public long OptionId{ get => optionId; set => optionId = value; }

        public Vote()
        {

        }
        public Vote(int id, long time, int entityId, int optionId)
        {
            Id = id;
            Time = time;
            VoterId = entityId;
            OptionId = optionId;
        }
    }
}