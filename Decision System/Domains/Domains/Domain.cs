using Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace Core.Domains
{
    public class Domain<T> : IDomain<T> where T : IAggregateRoot
    {
        protected readonly IRepository<T> repository;

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

        public T Create(T entity) {
            return repository.Create(entity);
        }

        public T Update(T entity) {
            return repository.Update(entity);
        }

        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
