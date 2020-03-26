using Core.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public class AttachmentDto : BaseDto<Attachment>, IDto
    {
        public string Name { get; set; }
        public string Path { get; set; }
        
        public long UploadDate { get; set; }
        
        [Required]
        public long UploaderId { get; set; }
        
        [Required]
        public long OptionId { get; set; }

        [ForeignKey("uploaderId")]
        public virtual Voter Uploader { get; set; }

        [ForeignKey("optionId")]
        public virtual Option Option { get; set; }

        public AttachmentDto()
        {

        }

        public AttachmentDto(string name, string path, Voter uploader, long uploadDate, int uploaderId, int optionId)
        {
            Name = name;
            Path = path;
            Uploader = uploader;
            UploadDate = uploadDate;
            UploaderId = uploaderId;
            OptionId = optionId;
        }

        //public override Attachment AsEntity() {
        //    Attachment returnMe = new Attachment();

        //    returnMe.Id = Id;
        //    returnMe.Name = Name;
        //    returnMe.Option = Option;
        //    returnMe.OptionId = OptionId;
        //    returnMe.Path = Path;
        //    returnMe.UploadDate = UploadDate;
        //    returnMe.Uploader = Uploader;
        //    returnMe.UploaderId = UploaderId;

        //    return returnMe;
        
        //}

    }
}