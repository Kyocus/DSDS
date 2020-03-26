using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Core.Extentions;
using Core.Interfaces;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Logging;

namespace DecisionSystem.Repository
{
    public abstract class Repository<TEntity, TDto> : IRepository<TEntity> where TEntity : BaseModel<TDto>, IAggregateRoot where TDto : IDto
    {
        protected DbContext context;
        private readonly ILogger _logger;

        public Repository(DbContext repositoryContext, ILogger<TEntity> logger)
        {
            this.context = repositoryContext;
            _logger = logger;
        }


        public virtual async Task<IEnumerable<TEntity>> FindAllAsync(Expression<Func<TEntity, bool>> predicate = null)
        {
            var query = context.Set<TEntity>()
                .Include(context.GetIncludePaths(typeof(TEntity)));
            
            if (predicate != null)
            {
                query = query.Where(predicate);
            }
            return await query.ToListAsync();
        }

        public virtual IQueryable<TEntity> FindAll()
        {
            return this.context.Set<TEntity>().AsNoTracking();
        }

        public virtual IQueryable<TEntity> FindByCondition(Expression<Func<TEntity, bool>> expression)
        {
            return this.context.Set<TEntity>().Where(expression).AsNoTracking();
        }

        public virtual TEntity Create(TEntity entity)
        {
            try
            {
                EntityEntry<TEntity> returnMe = this.context.Set<TEntity>().Add(entity);
                context.SaveChanges();
                return returnMe.Entity;
            }
            catch (Exception e)
            {
                _logger.LogError("could not insert Decision");
            }

            return null;
        }

        public virtual async Task<TEntity> UpdateAsync(TEntity entity)
        {
            try
            {
                var updateMe = context.Entry(await context.Set<TEntity>().FirstOrDefaultAsync(x => x.Id == entity.Id));
                updateMe.CurrentValues.SetValues(entity);
                await context.SaveChangesAsync();
                return updateMe.Entity;
            }
            catch (Exception e)
            {
                _logger.LogError("could not update record\r\n" + e.Message);
            }

            return null;
        }

        public virtual TEntity Update(TEntity entity)
        {
            try
            {
                EntityEntry<TEntity> returnMe = this.context.Set<TEntity>().Update(entity);
                context.SaveChanges();
                return returnMe.Entity;
            }
            catch (Exception e)
            {
                _logger.LogError("could not update record\r\n" + e.Message);
            }

            return null;
        }

        public virtual void Delete(long id)
        {
            context.Set<TEntity>().Remove(context.Set<TEntity>().Find(id));
            context.SaveChanges();
        }

        public virtual TEntity FindById(long id)
        {
            return context.Find<TEntity>(id);
        }

        public virtual IEnumerable<TEntity> List(ISpecification<TEntity> spec)
        {
            // fetch a Queryable that includes all expression-based includes
            var queryableResultWithIncludes = spec.Includes
                .Aggregate(context.Set<TEntity>().AsQueryable(),
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


        private TEntity stripVirtualProps(TEntity entity)
        {
            foreach (var prop in typeof(TEntity).GetProperties())
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