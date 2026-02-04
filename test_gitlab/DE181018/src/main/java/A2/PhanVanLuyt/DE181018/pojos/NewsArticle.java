package A2.PhanVanLuyt.DE181018.pojos;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "news_article")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsArticle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_article_id")
    private Integer newsArticleId;

    @Column(name = "news_title")
    private String newsTitle;

    private String headline;

    @Column(name = "created_date")
    private LocalDateTime createdDate;

    @Column(name = "news_content")
    private String newsContent;

    @Column(name = "news_source")
    private String newsSource;

    @Column(name = "news_status")
    private Boolean newsStatus;

    // ===== CATEGORY =====
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    // ===== CREATED BY =====
    @ManyToOne
    @JoinColumn(name = "created_by_id")
    private SystemAccount createdBy;

    // ===== TAGS =====
    @OneToMany(mappedBy = "newsArticle")
    @JsonManagedReference
    private List<Tag> tags;
}
