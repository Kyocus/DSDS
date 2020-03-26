using System;
using System.Reflection;

namespace Core.Interfaces
{
    public class Mappable
    {
        public virtual T AsType<T>()
        {
            var entity = Activator.CreateInstance<T>();

            foreach (var propertyInfo in this.GetType()
            .GetProperties(BindingFlags.Public | BindingFlags.Instance))
            {
                //if the names match, move the property over
                //otherwise maybe we should use a lambda to do the mapping
                //or a dictionary

                var entityProp = entity.GetType().GetProperty(propertyInfo.Name);

                if (entityProp != null) {
                    entityProp.SetValue(entity, propertyInfo.GetValue(this));
                }
            }

            return entity;
        }
    }
}