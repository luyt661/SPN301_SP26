package Luyt.fudn.lab5.services;

import Luyt.fudn.lab5.pojos.Category;
import java.util.List;

public interface ICategoryService {
    List<Category> getAllCategories();
    Category getCategoryById(Integer id);
}
