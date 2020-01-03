using Core.Interfaces;
using System;

namespace Core.Models
{
    public class Attachment : BaseModel, IAggregateRoot
    {
        private string name;
        private string path;
        private int uploaderId;
        private Voter uploader;
        private long uploadDate;

        public string Name { get => name; set => name = value; }
        public string Path { get => path; set => path = value; }
        public virtual Voter Uploader { get => uploader; set => uploader = value; }
        public long UploadDate { get => uploadDate; set => uploadDate = value; }
        public int UploaderId { get => uploaderId; set => uploaderId = value; }

        public Attachment()
        {

        }

        public Attachment(string name, string path, long uploadDate, int uploaderId)
        {
            Name = name;
            Path = path;
            UploadDate = uploadDate;
            UploaderId = uploaderId;
        }
    }
}