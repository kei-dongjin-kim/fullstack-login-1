package com.example.myproject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.filter.CorsFilter;

import com.example.myproject.jwt.JwtAccessDeniedHandler;
import com.example.myproject.jwt.JwtAuthenticationEntryPoint;
import com.example.myproject.jwt.JwtTokenProvider;
import com.example.myproject.jwt.JwtFilter;

@EnableWebSecurity
@EnableMethodSecurity
@Configuration
public class SecurityConfig {
  private final JwtTokenProvider jwtTokenProvider;
  private final CorsFilter corsFilter;
  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
  private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

  public SecurityConfig(
    JwtTokenProvider jwtTokenProvider,
    CorsFilter corsFilter,
    JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
    JwtAccessDeniedHandler jwtAccessDeniedHandler
  ) {
    this.jwtTokenProvider = jwtTokenProvider;
    this.corsFilter = corsFilter;
    this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      // cors configuration
      .addFilterBefore(
        corsFilter, 
        UsernamePasswordAuthenticationFilter.class
      )

      // jwt filter configuration
      // jwt filter have to be before UsernamePasswordAuthenticationFilter
      // because we will check token before username and password
      .addFilterBefore(
        new JwtFilter(jwtTokenProvider),
        UsernamePasswordAuthenticationFilter.class
      )

      // exception handling configuration
      .exceptionHandling((exception) -> exception
        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
        .accessDeniedHandler(jwtAccessDeniedHandler)
      )

      // csrf have to be disabled, because we will use token.
      .csrf(AbstractHttpConfigurer::disable)

      // session have to be STATELESS, because will not use session
      .sessionManagement((sessionManagement) -> sessionManagement
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      )

      // authorize requests configuration
      .authorizeHttpRequests((authorizeRequests) -> authorizeRequests
        .requestMatchers("/api/login", "/api/signup").permitAll()
        .anyRequest().authenticated()
      );

    return http.build();
  }
}