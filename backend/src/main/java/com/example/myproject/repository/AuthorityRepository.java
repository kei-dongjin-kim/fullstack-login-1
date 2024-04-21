package com.example.myproject.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.myproject.entity.Authority;

public interface AuthorityRepository extends JpaRepository<Authority, String> {}
