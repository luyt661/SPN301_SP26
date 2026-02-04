package A2.PhanVanLuyt.DE181018.services;

import A2.PhanVanLuyt.DE181018.pojos.NewsArticle;
import A2.PhanVanLuyt.DE181018.repositories.NewsArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewsArticleService implements INewsArticleService {

    private final NewsArticleRepository newsRepo;

    public NewsArticleService(NewsArticleRepository newsRepo) {
        this.newsRepo = newsRepo;
    }

    @Override
    public List<NewsArticle> getActiveNews() {
        // 🔥 TẠM THỜI KHÔNG FILTER ĐỂ CÓ DATA
        return newsRepo.findAll();
    }

    @Override
    public List<NewsArticle> getByAccount(Integer accountId) {
        return newsRepo.findByCreatedBy_AccountId(accountId);
    }

    @Override
    public List<NewsArticle> search(String keyword) {
        return newsRepo.findByNewsTitleContainingIgnoreCase(keyword);
    }

    @Override
    public NewsArticle save(NewsArticle article) {
        return newsRepo.save(article);
    }
}
