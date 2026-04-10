package com.heitor.lojaapi.items.repository;

import com.heitor.lojaapi.items.model.ItemsModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemsRepository extends JpaRepository<ItemsModel, Long> {
}
