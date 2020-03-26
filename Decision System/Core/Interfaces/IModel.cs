using System;
using System.Reflection;

namespace Core.Interfaces
{
    public interface IModel<T>
    {
        public T AsDto();
    }
}