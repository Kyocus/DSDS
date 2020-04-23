using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class DecisionDto : BaseDto<Decision>, IDto
    {
        public List<VoteDto> Votes { get; set; }
        public List<OptionDto> Options { get; set; }
        public List<CommentDto> Comments { get; set; }
        public List<AttachmentDto> Attachments { get; set; }

        public StatusDto Status { get; set; }
        public GroupSummaryDto Group { get; set; }
        public long CreationDate { get; set; }
        public string Description { get; set; }
        public long ExpirationDate { get; set; }
        public string Name { get; set; }
        public long StatusDate { get; set; }
        public long StatusId { get; set; }
        public long GroupId { get; set; }

        public DecisionDto()
        {
        }

        public override Decision AsEntity()
        {
            Decision returnMe = new Decision();

            if (Attachments != null)
            {
                returnMe.Attachments = Attachments.Select(x => x.AsEntity()).ToList();

            }
            if (Comments != null)
            {
                returnMe.Comments = Comments.Select(x => x.AsEntity()).ToList();
            }

            var gd = new GroupDecision();
            gd.GroupId = GroupId;
            gd.DecisionId = Id;

            returnMe.CreationDate = CreationDate;
            returnMe.Description = Description;
            returnMe.Name = Name;
            returnMe.Id = Id;
            returnMe.GroupDecisions.Add(gd);
            returnMe.StatusId = StatusId;
            returnMe.ExpirationDate = ExpirationDate;

            return returnMe;
        }
    }
}
