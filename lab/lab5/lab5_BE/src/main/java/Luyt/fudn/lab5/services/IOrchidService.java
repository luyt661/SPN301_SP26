package Luyt.fudn.lab5.services;

import Luyt.fudn.lab5.pojos.Orchid;

import java.util.List;

public interface IOrchidService {
    List<Orchid> getAllOrchids();
    Orchid getOrchidById(Integer id);
    Orchid createOrchid(Orchid orchid);
    Orchid updateOrchid(Integer id, Orchid orchid);
    void deleteOrchid(Integer id);
}