using System;

namespace DecisionSystem.Models
{
    public class Attachment
    {

        private int id;
        private string name;
        private string path;
        private Entity uploader;
        private long uploadDate;

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Path { get => path; set => path = value; }
        public Entity Uploader { get => uploader; set => uploader = value; }
        public long UploadDate { get => uploadDate; set => uploadDate = value; }

        public Attachment(int id, string name, string path, Entity uploader, long uploadDate)
        {
            Id = id;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Path = path ?? throw new ArgumentNullException(nameof(path));
            Uploader = uploader ?? throw new ArgumentNullException(nameof(uploader));
            UploadDate = uploadDate;
        }
    }
}