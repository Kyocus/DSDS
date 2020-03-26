using Core.Interfaces;
using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Classes
{
    public class Votable : BaseModel<VotableDto>, IAggregateRoot
    {

        private int upvotes;
        private int downvotes;

        public int Upvotes { get => upvotes; set => upvotes = value; }
        public int Downvotes { get => downvotes; set => downvotes = value; }


        public Votable()
        {
            Upvotes = 0;
            Downvotes = 0;
        }

        public Votable(int upvotes, int downvotes)
        {
            Upvotes = upvotes;
            Downvotes = downvotes;
        }
    }
}
