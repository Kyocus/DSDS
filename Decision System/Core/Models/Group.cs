﻿using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class Group : BaseModel, IAggregateRoot
    {
        private string name;
        private string description;
        private long parentGroupId;
        private long creationDate;

        [ForeignKey("parentGroupId")]
        public virtual Group ParentGroup { get; set; }
        public virtual List<Decision> Decisions { get; set; }
        //Groups or Entities
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }

        [Required]
        public long ParentGroupId { get => parentGroupId; set => parentGroupId = value; }
        public long CreationDate { get => creationDate; set => creationDate = value; }

        public Group()
        {

        }

        public Group(int id, string name, string description, int parentGroupId, long creationDate)
        {
            Id = id;
            Name = name ?? throw new ArgumentNullException(nameof(name));
            Description = description ?? throw new ArgumentNullException(nameof(description));
            ParentGroupId = parentGroupId;
            CreationDate = creationDate;
        }
    }
}
