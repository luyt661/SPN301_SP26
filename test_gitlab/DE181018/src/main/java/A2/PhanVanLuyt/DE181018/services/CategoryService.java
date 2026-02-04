package A2.PhanVanLuyt.DE181018.services;

import A2.PhanVanLuyt.DE181018.pojos.Category;
import A2.PhanVanLuyt.DE181018.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService implements ICategoryService {

    private final CategoryRepository categoryRepo;

    public CategoryService(CategoryRepository categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    @Override
    public List<Category> getActiveCategories() {
        return categoryRepo.findByIsActiveTrue();
    }

    @Override
    public List<Category> searchByName(String keyword) {
        return categoryRepo.findByCategoryNameContainingIgnoreCase(keyword);
    }

    @Override
    public Category save(Category category) {
        return categoryRepo.save(category);
    }
}
