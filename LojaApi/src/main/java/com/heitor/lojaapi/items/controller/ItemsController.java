package com.heitor.lojaapi.items.controller;

import com.heitor.lojaapi.items.dto.ItemsDto;
import com.heitor.lojaapi.items.model.ItemsModel;
import com.heitor.lojaapi.items.service.ItemsService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/items")
public class ItemsController {
  private final ItemsService itemsService;
  public ItemsController(ItemsService itemsService) {
    this.itemsService = itemsService;
  }

  @GetMapping
  public ResponseEntity<List<ItemsModel>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(itemsService.findAll());
  }

  @PostMapping
  @ResponseStatus
  public ResponseEntity<ItemsModel> save(@RequestBody @Valid ItemsDto itemsDto) {
    ItemsModel itemsModel = new ItemsModel();
    BeanUtils.copyProperties(itemsDto, itemsModel);
    return ResponseEntity.status(HttpStatus.CREATED).body(itemsService.save(itemsModel));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ItemsModel> findById(@PathVariable Long id) {
    if(itemsService.findById(id).isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.status(HttpStatus.OK).body(itemsService.findById(id).get());
  }

  @PutMapping("/{id}")
  public ResponseEntity<String> update(@PathVariable Long id, @RequestBody @Valid ItemsDto itemsDto) {
    if(itemsService.findById(id).isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    ItemsModel itemsModel = itemsService.findById(id).get();
    BeanUtils.copyProperties(itemsDto, itemsModel);
    itemsService.save(itemsModel);
    return ResponseEntity.status(HttpStatus.OK).body("Updated");
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<String> delete(@PathVariable Long id) {
    if(!itemsService.existsById(id)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    itemsService.delete(id);
    return ResponseEntity.status(HttpStatus.OK).body("Deleted");
  }
}
