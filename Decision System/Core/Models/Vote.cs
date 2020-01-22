using Core.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public class Vote : BaseModel, IAggregateRoot
    {
        private long time;
        private long entityId;
        private long optionId;

        [ForeignKey("EntityId")]
        public virtual Voter Entity { get; set; }
        public long Time { get => time; set => time = value; }
        
        [Required]
        public long EntityId { get => entityId; set => entityId = value; }
        public long OptionId{ get => optionId; set => optionId = value; }

        public Vote()
        {

        }
        public Vote(int id, long time, int entityId, int optionId)
        {
            Id = id;
            Time = time;
            EntityId = entityId;
            OptionId = optionId;
        }
    }
}