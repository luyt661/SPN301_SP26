package A2.PhanVanLuyt.DE181018.pojos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "system_account")
@Data
public class SystemAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Integer accountId;

    @Column(name = "account_name")
    private String accountName;

    @Column(name = "account_email")
    private String accountEmail;

    @Column(name = "account_password")
    private String accountPassword;

    @Column(name = "account_role")
    private Integer accountRole;
}
