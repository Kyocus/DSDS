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
        public List<Vote> Votes { get; set; }
        public List<Option> Options { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Attachment> Attachments { get; set; }
        
        public virtual Status Status { get; set; }
        public long CreationDate { get; set; }
        public string Description { get; set; }
        public long ExpirationDate { get; set; }
        public string Name { get; set; }
        public long StatusDate { get; set; }
        public long StatusId { get; set; }

        public DecisionDto()
        {
        }

        public Decision AsEntity() {
            Decision returnMe = new Decision();

            returnMe.Attachments = Attachments; 
            returnMe.Comments = Comments;
            returnMe.CreationDate = CreationDate;
            returnMe.Description = Description;
            returnMe.ExpirationDate = ExpirationDate;

            return returnMe;
        }
    }
}
