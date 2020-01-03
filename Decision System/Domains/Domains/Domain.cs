using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public class Domain<T> : IDomain<T> where T : IAggregateRoot
    {
        IRepository<T> repository;

        public Domain(IRepository<T> repo)
        {
            repository = repo;
        }

        public T Get(int id) {
            return repository.FindById(id);
        }

        public IEnumerable<T> GetAll() {
            return repository.FindAll();
        }
    }
}
