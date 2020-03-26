
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace Core.Extentions
{


    public static class Extensions
    {
        public static void MatchAndMap<TSource, TDestination>(this TSource source, TDestination destination)
            where TSource : class, new()
            where TDestination : class, new()
        {
            if (source != null && destination != null)
            {
                List<PropertyInfo> sourceProperties = source.GetType().GetProperties().ToList<PropertyInfo>();
                List<PropertyInfo> destinationProperties = destination.GetType().GetProperties().ToList<PropertyInfo>();

                foreach (PropertyInfo sourceProperty in sourceProperties)
                {
                    PropertyInfo destinationProperty = destinationProperties.Find(item => item.Name == sourceProperty.Name);

                    if (destinationProperty != null)
                    {
                        try
                        {
                            destinationProperty.SetValue(destination, sourceProperty.GetValue(source, null), null);
                        }
                        catch (Exception ex)
                        {

                        }
                    }
                }
            }

        }

        public static TDestination MapProperties<TDestination>(this object source)
            where TDestination : class, new()
        {
            var destination = Activator.CreateInstance<TDestination>();
            MatchAndMap(source, destination);

            return destination;
        }

        /// <summary>
        /// this is a summary
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="queryable"></param>
        /// <returns></returns>
        //public static IQueryable<T> IncludeAll<T>(this IQueryable<T> queryable) where T : class
        //{
        //    var type = typeof(T);
        //    var properties = type.GetProperties();
        //    foreach (var property in properties)
        //    {
        //        var isVirtual = property.GetGetMethod().IsVirtual;
        //        if (isVirtual && properties.FirstOrDefault(c => c.Name == property.Name + "Id") != null)
        //        {
        //            queryable = queryable.In(property.Name);
        //        }
        //    }
        //    return queryable;
        //}
    }
}