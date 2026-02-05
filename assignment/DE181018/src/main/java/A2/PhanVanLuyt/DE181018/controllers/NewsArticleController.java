package A2.PhanVanLuyt.DE181018.controllers;

import A2.PhanVanLuyt.DE181018.pojos.NewsArticle;
import A2.PhanVanLuyt.DE181018.services.INewsArticleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/news")
@CrossOrigin(origins = "http://localhost:5173")
public class NewsArticleController {

    private final INewsArticleService newsService;

    public NewsArticleController(INewsArticleService newsService) {
        this.newsService = newsService;
    }

    @GetMapping
    public List<NewsArticle> getActiveNews() {
        return newsService.getActiveNews();
    }

    @GetMapping("/account/{id}")
    public List<NewsArticle> getByAccount(@PathVariable Integer id) {
        return newsService.getByAccount(id);
    }

    @GetMapping("/search")
    public List<NewsArticle> search(@RequestParam String keyword) {
        return newsService.search(keyword);
    }

    @PostMapping
    public NewsArticle save(@RequestBody NewsArticle article) {
        return newsService.save(article);
    }
}
