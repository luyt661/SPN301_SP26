package A2.PhanVanLuyt.DE181018.controllers;

import A2.PhanVanLuyt.DE181018.pojos.Category;
import A2.PhanVanLuyt.DE181018.services.ICategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")

public class CategoryController {

    private final ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    // GET: lấy category active
    @GetMapping
    public List<Category> getActiveCategories() {
        return categoryService.getActiveCategories();
    }

    // GET: search theo tên
    @GetMapping("/search")
    public List<Category> search(@RequestParam String keyword) {
        return categoryService.searchByName(keyword);
    }

    // POST: thêm / cập nhật
    @PostMapping
    public Category save(@RequestBody Category category) {
        return categoryService.save(category);
    }
}
