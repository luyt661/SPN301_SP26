package Luyt.fudn.lab4New.controllers;

import Luyt.fudn.lab4New.pojos.Orchid;
import Luyt.fudn.lab4New.services.IOrchidService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orchids")
@RequiredArgsConstructor
public class OrchidController {

    private final IOrchidService orchidService;

    // GET all
    @GetMapping
    public ResponseEntity<List<Orchid>> getAllOrchids() {
        return ResponseEntity.ok(orchidService.getAllOrchids());
    }

    // GET by id
    @GetMapping("/{id}")
    public ResponseEntity<Orchid> getOrchid(@PathVariable Integer id) {
        return ResponseEntity.ok(orchidService.getOrchidById(id));
    }

    // POST
    @PostMapping
    public ResponseEntity<Orchid> createOrchid(@RequestBody Orchid orchid) {
        return new ResponseEntity<>(orchidService.createOrchid(orchid), HttpStatus.CREATED);
    }

    // PUT
    @PutMapping("/{id}")
    public ResponseEntity<Orchid> updateOrchid(
            @PathVariable Integer id,
            @RequestBody Orchid orchid) {
        return ResponseEntity.ok(orchidService.updateOrchid(id, orchid));
    }

    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrchid(@PathVariable Integer id) {
        orchidService.deleteOrchid(id);
        return ResponseEntity.noContent().build();
    }
}
