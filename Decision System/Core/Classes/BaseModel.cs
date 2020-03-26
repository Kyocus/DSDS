using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Core.Models
{
    public class BaseModel<T> : Mappable, IModel<T>
    {
        private long id;

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get => id; set => id = value; }


        public virtual T AsDto()
        {
            return this.AsType<T>();
        }
    }
}
