using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Interfaces;
using DecisionSystem.Classes;

namespace Core.Models
{
    public class Comment : BaseModel<CommentDto>, IAggregateRoot
    {
        private long voterId;
        private long time;
        private Votable rating;


        [ForeignKey("entityId")]
        public virtual Voter Voter { get; set; }
        public long Time { get => time; set => time = value; }

        [Required]
        public long VoterId { get => voterId; set => voterId = value; }

        //todo figure out how to relate the votes to the records
        public Votable Rating { get => rating; set => rating = value; }

        public Comment()
        {

        }

        public Comment(long time, int entityId)
        {
            Time = time;
            VoterId = entityId;
        }
    }
}