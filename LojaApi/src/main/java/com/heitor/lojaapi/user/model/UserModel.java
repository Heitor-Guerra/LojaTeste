package com.heitor.lojaapi.user.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;

import java.io.Serial;
import java.io.Serializable;

@Entity
@Table(name = "users")
public class UserModel implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;


  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Email(message = "Please provide a valid email")
  @Column(nullable = false, unique = true) //lenght default is 255 (max email size)
  private String email;

  @Column(nullable = false, length = 64)
  private String password;

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }
}
