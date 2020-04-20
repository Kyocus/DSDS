using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class PersistDecisionDto : BaseDto<Decision>, IDto
    {
        public string Description { get; set; }
        //public long ExpirationDate { get; set; }
        public string Name { get; set; }
        public long StatusDate { get; set; }
        public long StatusId { get; set; }
        public long GroupId { get; set; }

        public PersistDecisionDto()
        {
        }

        public override Decision AsEntity()
        {
            Decision returnMe = new Decision();

            returnMe.CreationDate = DateTime.Now.Ticks;
            returnMe.Description = Description;
            returnMe.Name = Name;
            returnMe.ExpirationDate = DateTime.Now.AddYears(1).Ticks;

            return returnMe;
        }
    }
}
