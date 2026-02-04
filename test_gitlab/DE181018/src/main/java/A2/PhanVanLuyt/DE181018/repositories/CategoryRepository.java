package A2.PhanVanLuyt.DE181018.repositories;

import A2.PhanVanLuyt.DE181018.pojos.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository
        extends JpaRepository<Category, Integer> {

    List<Category> findByIsActiveTrue();

    List<Category> findByCategoryNameContainingIgnoreCase(String keyword);
}
