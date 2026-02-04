package A2.PhanVanLuyt.DE181018.services;

import A2.PhanVanLuyt.DE181018.pojos.NewsArticle;

import java.util.List;

public interface INewsArticleService {

    List<NewsArticle> getActiveNews();

    List<NewsArticle> getByAccount(Integer accountId);

    List<NewsArticle> search(String keyword);

    NewsArticle save(NewsArticle article);
}
