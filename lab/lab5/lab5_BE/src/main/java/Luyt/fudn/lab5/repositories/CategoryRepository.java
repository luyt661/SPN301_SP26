package Luyt.fudn.lab5.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import Luyt.fudn.lab5.pojos.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
