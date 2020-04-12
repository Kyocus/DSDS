using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class UserDto : BaseDto<User>, IDto
    {
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public long CreationDate { get; set; }

        public UserDto()
        {

        }

        public override User AsEntity() {
            User returnMe = new User();
            
            returnMe.Id = Id;
            returnMe.FirstName = FirstName;
            returnMe.LastName = LastName;
            returnMe.MiddleName = MiddleName;
            returnMe.Address = Address;
            returnMe.City = City;
            returnMe.State = State;
            
            return returnMe;
        }
    }
}
