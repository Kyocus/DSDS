using Core.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Core.Models
{
    public class Attachment : BaseModel, IAggregateRoot
    {
        private string name;
        private string path;
        private int uploaderId;
        private int optionId;
        private long uploadDate;

        public string Name { get => name; set => name = value; }
        public string Path { get => path; set => path = value; }
        
        public long UploadDate { get => uploadDate; set => uploadDate = value; }
        
        [Required]
        public int UploaderId { get => uploaderId; set => uploaderId = value; }
        
        [Required]
        public int OptionId { get => optionId; set => optionId = value; }

        [ForeignKey("uploaderId")]
        public virtual Voter Uploader { get; set; }

        [ForeignKey("optionId")]
        public virtual Option Option { get; set; }

        public Attachment()
        {

        }

        public Attachment(string name, string path, Voter uploader, long uploadDate, int uploaderId, int optionId)
        {
            Name = name;
            Path = path;
            Uploader = uploader;
            UploadDate = uploadDate;
            UploaderId = uploaderId;
            OptionId = optionId;
        }
    }
}