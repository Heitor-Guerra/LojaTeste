package com.heitor.lojaapi.user.controller;

import com.heitor.lojaapi.user.dto.UserDto;
import com.heitor.lojaapi.user.model.UserModel;
import com.heitor.lojaapi.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/user")
public class UserController {
  private final UserService userService;
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping
  public ResponseEntity<List<UserModel>> findAll() {
    return ResponseEntity.status(HttpStatus.OK).body(userService.findAll());
  }

  @PostMapping
  @ResponseStatus
  public ResponseEntity<UserModel> save(@RequestBody @Valid UserDto userDto) {
    UserModel userModel = new UserModel();
    BeanUtils.copyProperties(userDto, userModel);
    return ResponseEntity.status(HttpStatus.CREATED).body(userService.save(userModel));
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserModel> findById(@PathVariable Long id) {
    Optional<UserModel> user = userService.findById(id);
    if(user.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    return ResponseEntity.status(HttpStatus.OK).body(user.get());
  }

  @PostMapping("/find-email")
  public ResponseEntity<UserModel> findByEmail(@RequestBody @Valid UserDto userDto) {
    Optional<UserModel> user = userService.findByEmail(userDto.email());
    if(user.isEmpty()) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    UserModel userModel = user.get();
    if (!userModel.getPassword().equals(userDto.password())) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    return ResponseEntity.status(HttpStatus.OK).body(userModel);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> delete(@PathVariable Long id) {
    if(!userService.existsById(id)) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
    userService.delete(id);
    return ResponseEntity.status(HttpStatus.OK).build();
  }
}
