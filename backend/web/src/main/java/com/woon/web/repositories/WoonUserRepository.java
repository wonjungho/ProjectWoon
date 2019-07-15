package com.woon.web.repositories;

import com.woon.web.entities.WoonUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * WoonUserRepository
 */
@Repository
public interface WoonUserRepository extends CrudRepository<WoonUser, Long> {

    // 로그인
    public WoonUser findUserByUserEmailAndPassword(String id, String password);

    // 마이페이지 접근시 email아이디로 접근
    public WoonUser findUserByUserEmail(String useremail);
    
}