using System;
using DecisionSystem.Classes;

namespace DecisionSystem.Models
{
    public class Comment : Votable
    {

        private int id;
        private Entity entity;
        private long time;

        public int Id { get => id; set => id = value; }
        public Entity Entity { get => entity; set => entity = value; }
        public long Time { get => time; set => time = value; }

        public Comment(int id, Entity entity, long time)
        {
            Id = id;
            Entity = entity ?? throw new ArgumentNullException(nameof(entity));
            Time = time;
        }
    }
}