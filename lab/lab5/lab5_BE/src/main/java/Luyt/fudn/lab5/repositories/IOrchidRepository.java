package Luyt.fudn.lab5.repositories;

import Luyt.fudn.lab5.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}
