package Luyt.fudn.lab4New.repositories;

import Luyt.fudn.lab4New.pojos.Orchid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrchidRepository extends JpaRepository<Orchid, Integer> {
}
