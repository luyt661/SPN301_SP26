package A2.PhanVanLuyt.DE181018.controllers;

import A2.PhanVanLuyt.DE181018.dtos.LoginRequest;
import A2.PhanVanLuyt.DE181018.pojos.SystemAccount;
import A2.PhanVanLuyt.DE181018.repositories.SystemAccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:5173")
public class AccountController {

    @Autowired
    private SystemAccountRepository accountRepo;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Optional<SystemAccount> opt =
                accountRepo.findByAccountEmail(request.getEmail());

        if (opt.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Email not found");
        }

        SystemAccount acc = opt.get();

        // DB hiện tại đang lưu password plain text
        if (!request.getPassword().equals(acc.getAccountPassword())) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Wrong password");
        }

        return ResponseEntity.ok(acc);
    }
}
