package com.woon.web.controller;

import com.woon.web.common.CommonConfig;
import com.woon.web.domain.WoonUserDTO;
import com.woon.web.entities.WoonUser;
import com.woon.web.repositories.WoonUserRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * WoonUserController
 */
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
public class WoonUserController {

    @Autowired
    WoonUserDTO user;
    @Autowired CommonConfig config;
    @Autowired
    WoonUserRepository repo;


    // 회원가입
    @PostMapping("/signup")
    public void signup(@RequestBody WoonUserDTO dto) {
        System.out.println("====회원가입====");
        WoonUser entity = new WoonUser();
        entity.setUserEmail(dto.getUserEmail());
        entity.setPassword(dto.getPassword());
        entity.setUserName(dto.getUserName());
        // entity.setProfile(dto.getpro);

        repo.save(entity);
    }

    // 로그인
    @PostMapping("/login")
    public WoonUserDTO login(@RequestBody WoonUserDTO dto) {
        return config.modelMapper().map(repo.findUserByUserEmailAndPassword(dto.getUserEmail(), dto.getPassword()),
                WoonUserDTO.class);
    }

    // 비밀번호 수정
    @PutMapping("/modi")
    public void modiPass(@RequestBody WoonUserDTO dto) {
        WoonUser entity = new WoonUser();
        entity = repo.findUserByUserEmail(dto.getUserEmail());
        entity.setPassword(dto.getPassword());

        repo.save(entity);
    }

    // 탈퇴
    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable String id) {
        WoonUser entity = new WoonUser();
        entity = repo.findUserByUserEmail(id);

        repo.deleteById(entity.getUno());
    }

    // 비밀번호 찾기
    // 개인정보 수정 (프로필사진)
}