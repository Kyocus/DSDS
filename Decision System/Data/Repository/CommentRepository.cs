using Core.Interfaces;
using Core.Models;
using DecisionSystem.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Repository
{
    public class CommentRepository : Repository<Comment> , ICommentRepository
    {
        public CommentRepository(DbContext context) : base(context)
        {

        }
    }
}
