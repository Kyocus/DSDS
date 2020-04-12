using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class User : BaseModel<UserDto>, IAggregateRoot
    {
        private long creationDate;
        private string firstName;
        private string middleName;
        private string lastName;
        private string address;
        private string city;
        private string state;
        private string zip; 

        public long CreationDate { get => creationDate; set => creationDate = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string MiddleName { get => middleName; set => middleName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Name { get => firstName + " " + middleName + " " + lastName; }
        public string Address { get => address; set => address = value; }
        public string City { get => city; set => city = value; }
        public string State { get => state; set => state = value; }
        public string Zip { get => zip; set => zip = value; }

        public User()
        {
        }

        public override UserDto AsDto()
        {
            UserDto returnMe = new UserDto();

            returnMe.Id = this.Id;
            returnMe.FirstName = FirstName;
            returnMe.LastName = LastName;
            returnMe.MiddleName = MiddleName;
            returnMe.Address = Address;
            returnMe.City = City;
            returnMe.State = State;
            returnMe.Zip = Zip;
            returnMe.CreationDate = this.CreationDate;

            return returnMe;
        }

    }
}
