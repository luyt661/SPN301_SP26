package Luyt.example.slot15.reponsitories;

import Luyt.example.slot15.pojos.Product;

import java.util.List;

public interface IProductRepository {
    // Định nghĩa các phương thức crud cho product lấy dữ liệutừ List<Product>
    public  List<Product> getAllProducts();
    public Product getProductById(int id);
    public Product addProduct (Product product);
    public Product updateProduct (Product product);
    public  boolean deleteProduct (int id);
    public Product searchProductByName(String name);
}
