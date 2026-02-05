package A2.PhanVanLuyt.DE181018.services;

import A2.PhanVanLuyt.DE181018.pojos.Category;

import java.util.List;

public interface ICategoryService {

    List<Category> getActiveCategories();

    List<Category> searchByName(String keyword);

    Category save(Category category);
}
