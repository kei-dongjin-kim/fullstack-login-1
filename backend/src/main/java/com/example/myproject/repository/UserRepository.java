package com.example.myproject.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.myproject.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

  @EntityGraph(attributePaths = "authorities")
  Optional<User> findOneWithAuthoritiesByEmail(String email);

}
