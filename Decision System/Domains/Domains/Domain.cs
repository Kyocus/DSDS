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

        public void Create(T entity) {
            repository.Create(entity);
        }

        public void Update(T entity) {
            repository.Update(entity);
        }

        public void Delete(int id)
        {
            repository.Delete(id);
        }
    }
}
