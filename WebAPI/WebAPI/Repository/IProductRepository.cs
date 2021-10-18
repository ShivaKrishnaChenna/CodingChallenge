using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repository
{
    public interface IProductRepository
    {
        Task<List<Customers>> GetCustomers();

        Task<List<Products>> GetProducts(int? customerId);

        Task<Products> GetProduct(int? productId);

        Task<int> AddProduct(Products product);

        Task<int> DeleteProduct(int? productId);

        Task UpdateProduct(Products product);
    }
}
