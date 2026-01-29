package Luyt.fudn.lab5.controllers;

import Luyt.fudn.lab5.pojos.Category;
import Luyt.fudn.lab5.services.ICategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    private final ICategoryService categoryService;

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @GetMapping("/{id}")
    public Category getCategory(@PathVariable Integer id) {
        return categoryService.getCategoryById(id);
    }
}
