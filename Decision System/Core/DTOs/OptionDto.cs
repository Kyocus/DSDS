using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Models
{
    public class OptionDto : BaseDto<Option>, IDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual List<Attachment> Attachments { get; }

        public OptionDto()
        {

        }

    }
}
