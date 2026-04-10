package com.heitor.lojaapi.user.service;

import com.heitor.lojaapi.user.model.UserModel;
import com.heitor.lojaapi.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
  private final UserRepository userRepository;
  public UserService(UserRepository userRepository) {
    this.userRepository = userRepository;
  }


  @Transactional
  public UserModel save(UserModel userModel) {
    return userRepository.save(userModel);
  }

  public List<UserModel> findAll() {
    return userRepository.findAll();
  }

  public boolean existsById(Long id) {
    return userRepository.existsById(id);
  }

  public Optional<UserModel> findById(Long id) {
    return userRepository.findById(id);
  }

  public Optional<UserModel> findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  @Transactional
  public void delete(Long id) {
    userRepository.deleteById(id);
  }
}
