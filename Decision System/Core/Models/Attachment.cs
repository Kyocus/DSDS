using Core.Interfaces;
using System;

namespace Core.Models
{
    public class Attachment : BaseModel, IAggregateRoot
    {
        private string name;
        private string path;
        private int uploaderId;
        private int optionId;
        private Voter uploader;
        private long uploadDate;

        public string Name { get => name; set => name = value; }
        public string Path { get => path; set => path = value; }
        public virtual Voter Uploader { get => uploader; set => uploader = value; }
        public long UploadDate { get => uploadDate; set => uploadDate = value; }
        public int UploaderId { get => uploaderId; set => uploaderId = value; }
        public int OptionId { get => optionId; set => optionId = value; }

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