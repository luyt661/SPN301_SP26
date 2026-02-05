package A2.PhanVanLuyt.DE181018.repositories;

import A2.PhanVanLuyt.DE181018.pojos.SystemAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SystemAccountRepository
        extends JpaRepository<SystemAccount, Integer> {

    Optional<SystemAccount> findByAccountEmail(String accountEmail);
}
