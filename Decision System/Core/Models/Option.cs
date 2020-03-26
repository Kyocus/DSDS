using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models
{
    public class Option : BaseModel<OptionDto>, IAggregateRoot
    {
        private string name;
        private string description;

        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public virtual List<Attachment> Attachments { get; }

        public Option()
        {
            Attachments = new List<Attachment>(); 
        }
        public Option(string name, string description)
        {
            Name = name;
            Description = description;
        }

    }
}
