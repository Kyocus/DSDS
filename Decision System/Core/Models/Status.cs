﻿using Core.Interfaces;
using System;

namespace Core.Models
{
    public class Status : BaseModel, IAggregateRoot
    {
        private int id;
        private string name;

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }

        public Status(int id, string name)
        {
            Id = id;
            Name = name ?? throw new ArgumentNullException(nameof(name));
        }
    }
}