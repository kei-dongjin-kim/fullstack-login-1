package com.example.myproject.service;

import java.util.Collections;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.myproject.dto.UserDto;
import com.example.myproject.entity.Authority;
import com.example.myproject.entity.User;
import com.example.myproject.exception.DuplicateMemberException;
import com.example.myproject.exception.NotFoundMemberException;
import com.example.myproject.repository.UserRepository;
import com.example.myproject.util.SecurityUtil;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  @Transactional
  public UserDto signup(UserDto userDto) {
    if (userRepository.findOneWithAuthoritiesByEmail(userDto.getEmail()).orElse(null) != null) {
      throw new DuplicateMemberException("You are already signed up");
    }

    Authority authority = Authority.builder()
      .authorityName("ROLE_USER")
      .build();

    User user = User.builder()
      .email(userDto.getEmail())
      .password(passwordEncoder.encode(userDto.getPassword()))
      .nickname(userDto.getNickname())
      .authorities(Collections.singleton(authority))
      .activated(true)
      .build();

    return UserDto.from(userRepository.save(user));
  }

  @Transactional(readOnly = true)
  public UserDto getUserWithAuthorities(String email) {
    return UserDto.from(userRepository.findOneWithAuthoritiesByEmail(email).orElse(null));
  }

  @Transactional(readOnly = true)
  public UserDto getMyUserWithAuthorities() {
    return UserDto.from(
      SecurityUtil.getCurrentUsername()
        .flatMap(userRepository::findOneWithAuthoritiesByEmail)
        .orElseThrow(() -> new NotFoundMemberException("Member not found"))
    );
  }

}
