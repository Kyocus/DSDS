using Core.Interfaces;

namespace Core.Models
{
    public class Vote : BaseModel, IAggregateRoot
    {
        private int id;
        private long time;
        private int entityId;
        private int selectedOption;

        public virtual Voter Entity { get; set; }
        public int Id { get => id; set => id = value; }
        public long Time { get => time; set => time = value; }
        public int EntityId { get => entityId; set => entityId = value; }
        public int SelectedOption { get => selectedOption; set => selectedOption = value; }

        public Vote(int id, long time, int entityId, int selectedOption)
        {
            Id = id;
            Time = time;
            EntityId = entityId;
            SelectedOption = selectedOption;
        }
    }
}