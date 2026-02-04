package A2.PhanVanLuyt.DE181018.repositories;

import A2.PhanVanLuyt.DE181018.pojos.NewsArticle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NewsArticleRepository
        extends JpaRepository<NewsArticle, Integer> {

    List<NewsArticle> findByNewsStatusTrue();

    List<NewsArticle> findByCreatedBy_AccountId(Integer accountId);

    List<NewsArticle> findByNewsTitleContainingIgnoreCase(String keyword);
}
