package A2.PhanVanLuyt.DE181018.pojos;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "category")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id")
    private Integer categoryId;

    @Column(name = "category_name")
    private String categoryName;

    @Column(name = "category_description")
    private String categoryDescription;

    @ManyToOne
    @JoinColumn(name = "parent_category_id")
    private Category parentCategory;

    @Column(name = "is_active")
    private Boolean isActive;
}
