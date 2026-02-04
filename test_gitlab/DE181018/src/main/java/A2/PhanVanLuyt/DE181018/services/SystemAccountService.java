package A2.PhanVanLuyt.DE181018.services;

import A2.PhanVanLuyt.DE181018.pojos.SystemAccount;
import A2.PhanVanLuyt.DE181018.repositories.SystemAccountRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class SystemAccountService implements ISystemAccountService {

    private final SystemAccountRepository accountRepo;

    public SystemAccountService(SystemAccountRepository accountRepo) {
        this.accountRepo = accountRepo;
    }

    @Override
    public Optional<SystemAccount> login(String email, String password) {
        Optional<SystemAccount> acc = accountRepo.findByAccountEmail(email);
        if (acc.isPresent() &&
                acc.get().getAccountPassword().equals(password)) {
            return acc;
        }
        return Optional.empty();
    }
    
}
