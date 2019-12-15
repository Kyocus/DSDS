using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Decision : BaseModel, IAggregateRoot
    {

        private int id;
        private List<Vote> votes;
        private List<string> options;
        private List<Comment> comments;
        private List<Attachment> attachments;
        private long creationDate;
        private string description;
        private long expirationDate;
        private string name;
        private Status status;
        private long statusDate;

        public int Id { get => id; set => id = value; }
        internal List<Vote> Votes { get => votes; set => votes = value; }
        public List<string> Options { get => options; set => options = value; }
        internal List<Comment> Comments { get => comments; set => comments = value; }
        internal List<Attachment> Attachments { get => attachments; set => attachments = value; }
        public long CreationDate { get => creationDate; set => creationDate = value; }
        public string Description { get => description; set => description = value; }
        public long ExpirationDate { get => expirationDate; set => expirationDate = value; }
        public string Name { get => name; set => name = value; }
        internal Status Status { get => status; set => status = value; }
        public long StatusDate { get => statusDate; set => statusDate = value; }



        public Decision()
        {

        }

        public Decision(int id, List<Vote> votes, List<string> options, List<Comment> comments, List<Attachment> attachments, long creationDate, string description, long expirationDate, string name, Status status, long statusDate)
        {
            Id = id;
            Votes = votes ?? throw new ArgumentNullException(nameof(votes));
            Options = options ?? throw new ArgumentNullException(nameof(options));
            Comments = comments ?? throw new ArgumentNullException(nameof(comments));
            Attachments = attachments ?? throw new ArgumentNullException(nameof(attachments));
            CreationDate = creationDate;
            Description = description ?? throw new ArgumentNullException(nameof(description));
            ExpirationDate = expirationDate;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Status = status ?? throw new ArgumentNullException(nameof(status));
            StatusDate = statusDate;
        }
    }


}
