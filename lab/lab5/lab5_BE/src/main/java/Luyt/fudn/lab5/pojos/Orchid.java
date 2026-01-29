package Luyt.fudn.lab5.pojos;

import jakarta.persistence.*;
import lombok.*;
import java.io.Serializable;

@Entity
@Table(name = "Orchid")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Orchid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private Integer orchidId;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "orchid_description", columnDefinition = "nvarchar(max)")
    private String orchidDescription;

    @Column(name = "orchid_url", length = 1000)
    private String orchidUrl;

    @Column(name = "is_attractive")
    private Boolean isAttractive;

    @Column(name = "is_natural")
    private Boolean isNatural;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
}
