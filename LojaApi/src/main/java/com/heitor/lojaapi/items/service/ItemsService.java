package com.heitor.lojaapi.items.service;

import com.heitor.lojaapi.items.model.ItemsModel;
import com.heitor.lojaapi.items.repository.ItemsRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemsService {
  private final ItemsRepository itemsRepository;

  public ItemsService(ItemsRepository itemsRepository) {
    this.itemsRepository = itemsRepository;
  }

  @Transactional
  public ItemsModel save(ItemsModel itemsModel) {
    return itemsRepository.save(itemsModel);
  }

  public List<ItemsModel> findAll() {
    return itemsRepository.findAll();
  }

  public boolean existsById(Long id) {
    return itemsRepository.existsById(id);
  }

  public Optional<ItemsModel> findById(Long id) {
    return itemsRepository.findById(id);
  }

  @Transactional
  public void delete(Long id) {
    itemsRepository.deleteById(id);
  }
}
