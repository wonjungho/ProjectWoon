package com.woon.web.repositories;

import java.util.Optional;

import com.woon.web.entities.WoonJoinGroup;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * WoonJoinGroupRepository
 */
@Repository
public interface WoonJoinGroupRepository extends CrudRepository<WoonJoinGroup, Long> {
    //그룹 탈퇴 
    @Query(value="DELETE FROM tbl_joingroups WHERE uno=?1 and groupno=?2",nativeQuery=true)
    void deleteByUnoAndGroupno(Long uno, Long groupno);
    
    //현재 사용자가 해당 그룹의 리더인지 판단
    @Query(value="SELECT GROUP_leader FROM tbl_joingroups jg WHERE jg.uno=?1 and jg.groupno=?2",nativeQuery=true)
	public String checkLeader(Long uno, Long groupno); 
}