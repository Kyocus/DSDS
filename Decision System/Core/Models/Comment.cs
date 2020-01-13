using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Interfaces;
using DecisionSystem.Classes;

namespace Core.Models
{
    public class Comment : Votable, IAggregateRoot
    {
        private int entityId;
        private long time;

        [ForeignKey("entityId")]
        public virtual Voter Entity { get; set; }
        public long Time { get => time; set => time = value; }

        [Required]
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