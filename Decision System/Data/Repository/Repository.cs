using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Logging;

namespace DecisionSystem.Repository
{
    public abstract class Repository<T> : IRepository<T> where T : BaseModel, IAggregateRoot
    {
        protected DbContext context;
        private readonly ILogger _logger;

        public Repository(DbContext repositoryContext, ILogger<T> logger)
        {
            this.context = repositoryContext;
            _logger = logger;
        }

        public IQueryable<T> FindAll()
        {
            return this.context.Set<T>().AsNoTracking();
        }

        public IQueryable<T> FindByCondition(Expression<Func<T, bool>> expression)
        {
            return this.context.Set<T>().Where(expression).AsNoTracking();
        }

        public T Create(T entity)
        {
            try
            {
                EntityEntry<T> returnMe = this.context.Set<T>().Add(stripVirtualProps(entity));
                context.SaveChanges();
                return returnMe.Entity;
            }
            catch (Exception e) {
                _logger.LogError("could not insert Decision");
            }

            return null;
        }

        public T Update(T entity)
        {
            try
            {
                EntityEntry<T> returnMe = this.context.Set<T>().Update(stripVirtualProps(entity));
                context.SaveChanges();
                return returnMe.Entity;
            }
            catch (Exception e) { 
                _logger.LogError("could not update Decision");
            }

            return null;
        }

        public void Delete(int id) {
            context.Set<T>().Remove(context.Set<T>().Find(id));
            context.SaveChanges();
        }

        public T FindById(long id)
        {
            return context.Find<T>(id);
        }

        public IEnumerable<T> List(ISpecification<T> spec)
        {
            // fetch a Queryable that includes all expression-based includes
            var queryableResultWithIncludes = spec.Includes
                .Aggregate(context.Set<T>().AsQueryable(),
                    (current, include) => current.Include(include));

            // modify the IQueryable to include any string-based include statements
            var secondaryResult = spec.IncludeStrings
                .Aggregate(queryableResultWithIncludes,
                    (current, include) => current.Include(include));

            // return the result of the query using the specification's criteria expression
            return secondaryResult
                            .Where(spec.Criteria)
                            .AsEnumerable();
        }


        private T stripVirtualProps(T entity) {
            foreach (var prop in typeof(T).GetProperties())
            {
                if (prop.GetGetMethod().IsVirtual)
                {
                    prop.SetValue(entity, null);
                }
            }
            return entity;
        }
    }
}