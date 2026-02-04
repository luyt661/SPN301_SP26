package Luyt.example.slot15.service;

import Luyt.example.slot15.pojos.Product;

import java.util.List;

public interface IProductService {

    Product createProduct(Product product);

    Product getProductById(int id);

    List<Product> getAllProducts();

    Product updateProduct(Product product);

    boolean deleteProduct(int id);

    Product searchProductByName(String name);
}
