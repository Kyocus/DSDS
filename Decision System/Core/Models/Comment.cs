using System;
using Core.Interfaces;
using DecisionSystem.Classes;

namespace Core.Models
{
    public class Comment : Votable, IAggregateRoot
    {
        private int entityId;
        private Voter entity;
        private long time;

        public virtual Voter Entity { get => entity; set => entity = value; }
        public long Time { get => time; set => time = value; }
        public int EntityId { get => entityId; set => entityId = value; }

        public Comment()
        {

        }

        public Comment(long time, int entityId)
        {
            Time = time;
            EntityId = entityId;
        }
    }
}