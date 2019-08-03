package com.woon.web.repositories;

import com.woon.web.entities.WoonUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * WoonUserRepository
 */
@Repository
public interface WoonUserRepository extends JpaRepository<WoonUser, Long> {

    // 로그인
    public WoonUser findUserByUserEmailAndPassword(String id, String password);

    // 마이페이지 접근시 email아이디로 접근
    public WoonUser findUserByUserEmail(String useremail);

    // 임시 비밀번호 생성
    public WoonUser findUserByUserEmailAndUserName(String id, String name);
    
}