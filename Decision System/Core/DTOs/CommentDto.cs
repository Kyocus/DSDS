using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Core.Interfaces;

namespace Core.Models
{
    public class CommentDto : BaseDto<Comment>, IDto
    {
        private long voterId;
        private long time;
        private VotableDto rating;

        [ForeignKey("entityId")]
        public virtual VoterDto Voter { get; set; }
        public long Time { get => time; set => time = value; }

        [Required]
        public long VoterId { get => voterId; set => voterId = value; }
        public VotableDto Rating { get => rating; set => rating = value; }

        public CommentDto()
        {

        }

        public CommentDto(long time, int entityId)
        {
            Time = time;
            VoterId = entityId;
        }

        public Comment AsEntity() {
            Comment returnMe = new Comment();

            returnMe.Voter = this.Voter.AsEntity();
            returnMe.VoterId = VoterId;
            returnMe.Time = Time;
            returnMe.Rating = Rating.AsEntity();

            return returnMe;
        }
    }
}