using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            DateTimeOffset dto = new DateTimeOffset(DateTime.Now);

            builder.HasKey(o => o.Id);

            builder.HasData(
                new { 
                    Id = 1l
                    ,FirstName = "Steve"
                    ,LastName = "Buscemi"
                    ,MiddleName = ""
                    ,Address = "an address"
                    ,City = "a city"
                    ,State = "a state"
                    ,Zip = "12345"
                    ,CreationDate = dto.ToUnixTimeSeconds()
                },
                new { 
                    Id = 2l
                    ,FirstName = "Jeff"
                    ,LastName = "Bridges"
                    ,MiddleName = ""
                    ,Address = "another address"
                    ,City = "another city"
                    ,State = "another state"
                    ,Zip = "12345"
                    ,CreationDate = dto.ToUnixTimeSeconds()
                },
                new { 
                    Id = 3l
                    ,FirstName = "Walter"
                    ,LastName = "Melon"
                    ,MiddleName = ""
                    ,Address = "beehive"
                    ,City = "brisbeeland"
                    ,State = "underland"
                    ,Zip = "12345"
                    ,CreationDate = dto.ToUnixTimeSeconds()
                },
                new { 
                    Id = 4l
                    ,FirstName = "John"
                    ,LastName = "Ritter"
                    ,MiddleName = ""
                    ,Address = "address 3598q34095ruwiojrk"
                    ,City = "city u98t8iju3w8i4roij489oirf"
                    ,State = "state 98u3iro3u9f09398jiefgjeo48ti"
                    ,Zip = "12345"
                    ,CreationDate = dto.ToUnixTimeSeconds()
                }
            );
        }
    }
}
