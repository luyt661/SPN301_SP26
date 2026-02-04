package Luyt.fudn.lab4New.services;


import Luyt.fudn.lab4New.pojos.Orchid;

import java.util.List;

public interface IOrchidService {
    List<Orchid> getAllOrchids();
    Orchid getOrchidById(Integer id);
    Orchid createOrchid(Orchid orchid);
    Orchid updateOrchid(Integer id, Orchid orchid);
    void deleteOrchid(Integer id);
}

