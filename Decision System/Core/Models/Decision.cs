﻿using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Decision : BaseModel<DecisionDto>, IAggregateRoot
    {

        private long creationDate;
        private string description;
        private long expirationDate;
        private string name;
        private long statusId;
        private Status status;
        private long statusDate;

        public virtual List<GroupDecision> GroupDecisions { get; set; }
        public virtual List<Vote> Votes { get; set; }
        public virtual List<Option> Options { get; set; }
        public virtual List<Comment> Comments { get; set; }
        public virtual List<Attachment> Attachments { get; set; }

        [ForeignKey("statusId")]
        public Status Status { get => status; set => status = value; }
        public long CreationDate { get => creationDate; set => creationDate = value; }
        public string Description { get => description; set => description = value; }
        public long ExpirationDate { get => expirationDate; set => expirationDate = value; }
        public string Name { get => name; set => name = value; }
        public long StatusDate { get => statusDate; set => statusDate = value; }

        [Required]
        public long StatusId { get => statusId; set => statusId = value; }

        public Decision()
        {
            GroupDecisions = new List<GroupDecision>();
            Votes = new List<Vote>();
            Options = new List<Option>();
            Comments = new List<Comment>();
            Attachments = new List<Attachment>();
        }

        public Decision(List<Vote> votes, List<Option> options, List<Comment> comments, List<Attachment> attachments, Status status, long creationDate, string description, long expirationDate, string name, long statusDate, int statusId)
        {
            Votes = votes;
            Options = options;
            Comments = comments;
            Attachments = attachments;
            Status = status ?? throw new ArgumentNullException(nameof(status));
            CreationDate = creationDate;
            Description = description ?? throw new ArgumentNullException(nameof(description));
            ExpirationDate = expirationDate;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            StatusDate = statusDate;
            StatusId = statusId;
        }


        public override DecisionDto AsDto()
        {
            DecisionDto returnMe = new DecisionDto();

            returnMe.Description = Description;
            returnMe.CreationDate = CreationDate;
            returnMe.Id = Id;
            returnMe.Name = Name;
            returnMe.ExpirationDate = ExpirationDate;

            var gd = GroupDecisions.Find(x => x.DecisionId == Id);

            if (gd != null)
            {
                returnMe.GroupId = gd.GroupId;

                if (gd.Group != null)
                {
                    var gs = new GroupSummaryDto();
                    gs.Description = gd.Group.Description;
                    gs.Id = gd.Group.Id;
                    gs.Name = gd.Group.Name;

                    returnMe.Group = gs;
                }
            }

            if (Attachments != null)
            {
                returnMe.Attachments = Attachments.Select(x => x.AsDto()).ToList();
            }

            return returnMe;
        }

    }
}
