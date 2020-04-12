using Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.Models
{
    public class VotableDto : BaseDto<Votable>
    {
        public int Upvotes { get; set; }
        public int Downvotes { get; set; }


        public VotableDto()
        {
            Upvotes = 0;
            Downvotes = 0;
        }

        public VotableDto(int upvotes, int downvotes)
        {
            Upvotes = upvotes;
            Downvotes = downvotes;
        }
    }
}
