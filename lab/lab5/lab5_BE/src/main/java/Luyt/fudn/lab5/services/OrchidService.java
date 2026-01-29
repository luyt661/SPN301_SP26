package Luyt.fudn.lab5.services;


import Luyt.fudn.lab5.pojos.Orchid;
import Luyt.fudn.lab5.repositories.IOrchidRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrchidService implements IOrchidService {

    private final IOrchidRepository orchidRepository;

    @Override
    public List<Orchid> getAllOrchids() {
        return orchidRepository.findAll();
    }

    @Override
    public Orchid getOrchidById(Integer id) {
        return orchidRepository.findById(id).orElse(null);
    }

    @Override
    public Orchid createOrchid(Orchid orchid) {
        return orchidRepository.save(orchid);
    }

    @Override
    public Orchid updateOrchid(Integer id, Orchid orchid) {
        orchid.setOrchidId(id);
        return orchidRepository.save(orchid);
    }

    @Override
    public void deleteOrchid(Integer id) {
        orchidRepository.deleteById(id);
    }
}

