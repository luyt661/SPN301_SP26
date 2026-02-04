package A2.PhanVanLuyt.DE181018.pojos;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tag")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Integer tagId;

    @Column(name = "tag_name")
    private String tagName;

    private String note;

    // ❗ Giữ mapping như bạn làm, CHỈ chặn loop
    @ManyToOne
    @JoinColumn(name = "news_article_id")
    @JsonBackReference
    private NewsArticle newsArticle;
}
