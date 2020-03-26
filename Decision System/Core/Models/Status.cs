using Core.Interfaces;
using System;

namespace Core.Models
{
    public class Status : BaseModel<StatusDto>, IAggregateRoot
    {
        private string name;

        public string Name { get => name; set => name = value; }

        public Status()
        {

        }
        public Status(int id, string name)
        {
            Id = id;
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }

    }
}