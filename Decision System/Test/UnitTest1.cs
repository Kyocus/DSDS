using Core.Models;
using DecisionSystem.Data;
using DecisionSystem.Repository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using Test;

namespace DecisionSystemTest
{
    [TestClass]
    public class UnitTest1
    {
        TestDataContext db = new TestDataContext();

        [TestMethod]
        public void Add_writes_to_database()
        {
            var options = new DbContextOptionsBuilder<TestDataContext>()
                .UseInMemoryDatabase(databaseName: "Add_writes_to_database")
                .Options;

            using (var context = new TestDataContext(options))
            {
                var repo = new VoterRepository(context, null);
                repo.Create(GetVoter());
                context.SaveChanges();
            }

            using (var context = new TestDataContext(options))
            {
                Voter voter = context.Voters.Single();

                var repo = new VoterRepository(context, null);
                repo.Create(GetVoter());
                context.SaveChanges();
            }
        }

        static Voter GetVoter()
        {
            Voter v = new Voter();

            v.Address = "";
            v.City = "";
            v.CreationDate = DateTime.UtcNow.Ticks;
            v.FirstName = "";
            v.Groups = new List<Group>();
            v.GroupVoters = new List<GroupVoter>();
            v.Id = 1;
            v.LastName = "";
            v.MiddleName = "";
            v.State = "";
            v.Zip = "";
            return v;
        }

        [TestMethod]
        public void AddGroup()
        {
        }

        [TestMethod]
        public void AddDecision()
        {
        }


    }
}
