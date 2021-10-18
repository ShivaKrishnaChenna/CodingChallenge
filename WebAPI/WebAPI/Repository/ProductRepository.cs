using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repository
{
    public class ProductRepository : IProductRepository
    {
        TestContext db;
        public ProductRepository(TestContext _db)
        {
            db = _db;
        }

        public async Task<List<Customers>> GetCustomers()
        {
            if (db != null)
            {
                return await db.Customers.ToListAsync();
            }

            return null;
        }

        public async Task<List<Products>> GetProducts(int? customerId)
        {
            if (db != null)
            {
                return await db.Products.Where(x => x.CustomerId == customerId).ToListAsync();
            }

            return null;
        }

        public async Task<Products> GetProduct(int? productId)
        {
            if (db != null)
            {
                return await db.Products.Where(x => x.ProductId == productId).FirstOrDefaultAsync();
            }

            return null;
        }

        public async Task<int> AddProduct(Products product)
        {
            if (db != null)
            {
                await db.Products.AddAsync(product);
                await db.SaveChangesAsync();

                return product.ProductId;
            }

            return 0;
        }

        public async Task<int> DeleteProduct(int? productId)
        {
            int result = 0;

            if (db != null)
            {
                var product = await db.Products.FirstOrDefaultAsync(x => x.ProductId == productId);

                if (product != null)
                {
                    db.Products.Remove(product);

                    result = await db.SaveChangesAsync();
                }
                return result;
            }

            return result;
        }

        public async Task UpdateProduct(Products product)
        {
            if (db != null)
            {
                db.Products.Update(product);

                await db.SaveChangesAsync();
            }
        }
    }
}
