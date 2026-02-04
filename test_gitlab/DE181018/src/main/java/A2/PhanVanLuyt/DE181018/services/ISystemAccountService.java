package A2.PhanVanLuyt.DE181018.services;

import A2.PhanVanLuyt.DE181018.pojos.SystemAccount;

import java.util.Optional;

public interface ISystemAccountService {

    Optional<SystemAccount> login(String email, String password);

}
