using Core.Interfaces;
using System;

namespace Core.Models
{
    public class StatusDto : BaseDto<Status>, IDto
    {
        public string Name { get; set; }

        public StatusDto()
        {

        }

    }
}