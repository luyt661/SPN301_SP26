package Luyt.fudn.lab4New.pojos;

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
public class Orchid implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orchid_id")
    private Integer orchidId;

    @Column(name = "is_attractive")
    private Boolean isAttractive;

    @Column(name = "is_natural")
    private Boolean isNatural;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "orchid_category", length = 255)
    private String orchidCategory;

    @Column(name = "orchid_description", columnDefinition = "nvarchar(max)")
    private String orchidDescription;

    @Column(name = "orchid_url", length = 1000)
    private String orchidUrl;
}
