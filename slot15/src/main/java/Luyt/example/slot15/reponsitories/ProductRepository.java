package Luyt.example.slot15.reponsitories;

import Luyt.example.slot15.pojos.Product;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepository implements IProductRepository {

    private List<Product> products;

    // Khởi tạo sẵn 3 sản phẩm mẫu
    public ProductRepository() {
        this.products = new ArrayList<>();

        products.add(new Product(1, "Iphone 15", 1200, "Apple smartphone", 10));
        products.add(new Product(2, "Samsung S24", 1000, "Samsung flagship", 8));
        products.add(new Product(3, "Xiaomi 14", 800, "Xiaomi high-end", 15));
    }

    @Override
    public List<Product> getAllProducts() {
        return products;
    }

    @Override
    public Product getProductById(int id) {
        for (Product p : products) {
            if (p.getId() == id) {
                return p;
            }
        }
        return null;
    }

    @Override
    public Product addProduct(Product product) {
        products.add(product);
        return product;
    }

    @Override
    public Product updateProduct(Product product) {
        for (Product p : products) {
            if (p.getId() == product.getId()) {
                p.setName(product.getName());
                p.setPrice(product.getPrice());
                p.setDescription(product.getDescription());
                p.setQuantity(product.getQuantity());
                return p;
            }
        }
        return null;
    }

    @Override
    public boolean deleteProduct(int id) {
        return products.removeIf(p -> p.getId() == id);
    }

    @Override
    public Product searchProductByName(String name) {
        for (Product p : products) {
            if (p.getName().equalsIgnoreCase(name)) {
                return p;
            }
        }
        return null;
    }

}
