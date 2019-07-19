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
    @Query(value="DELETE FROM tbl_joingroups WHERE uno=?1 and groupno=?2",nativeQuery=true)
    void deleteByUnoAndGroupno(String uno, String groupno);
   
}