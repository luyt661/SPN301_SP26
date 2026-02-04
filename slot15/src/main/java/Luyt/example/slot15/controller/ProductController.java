package Luyt.example.slot15.controller;

import Luyt.example.slot15.pojos.Product;
import Luyt.example.slot15.service.IProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final IProductService productService;

    // Inject Service
    public ProductController(IProductService productService) {
        this.productService = productService;
    }

    // GET /products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // GET /products/{id}
    @GetMapping("/{id}")
    public Product getProductById(@PathVariable int id) {
        return productService.getProductById(id);
    }

    // POST /products
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    // PUT /products
    @PutMapping
    public Product updateProduct(@RequestBody Product product) {
        return productService.updateProduct(product);
    }

    // DELETE /products/{id}
    @DeleteMapping("/{id}")
    public boolean deleteProduct(@PathVariable int id) {
        return productService.deleteProduct(id);
    }

    // GET /products/search?name=abc
    @GetMapping("/search")
    public Product searchProductByName(@RequestParam String name) {
        return productService.searchProductByName(name);
    }
}
