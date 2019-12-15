using System;
using Core.Interfaces;
using DecisionSystem.Classes;

namespace Core.Models
{
    public class Comment : Votable, IAggregateRoot
    {

        private int id;
        private Voter entity;
        private long time;

        public int Id { get => id; set => id = value; }
        public Voter Entity { get => entity; set => entity = value; }
        public long Time { get => time; set => time = value; }

        public Comment(int id, Voter entity, long time)
        {
            Id = id;
            Entity = entity ?? throw new ArgumentNullException(nameof(entity));
            Time = time;
        }
    }
}