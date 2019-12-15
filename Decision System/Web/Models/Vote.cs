namespace DecisionSystem.Models
{
    public class Vote : IAggregateRoot
    {
        private int id;
        private long time;
        private int entityId;
        private int selectedOption;

        public virtual Entity Entity { get; set; }
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