using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DecisionSystem.Repository
{
    public interface IRepository<T> where T : IAggregateRoot
    {

    }
}
