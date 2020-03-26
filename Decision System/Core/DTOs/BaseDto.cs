using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Core.Models
{
    public class BaseDto<T> : Mappable
    {
        public long Id { get; set; }

        public virtual T AsEntity() {
            return this.AsType<T>();
        }

    }
}
