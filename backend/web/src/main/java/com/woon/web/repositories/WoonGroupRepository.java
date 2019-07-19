package com.woon.web.repositories;

import java.util.List;

import com.woon.web.entities.WoonGroup;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * WoonGroupRepository
 */
@Repository
public interface WoonGroupRepository extends CrudRepository<WoonGroup, Long> {
    //내가 가입하거나 생성한 그룹 리스트
    @Query(value = "SELECT g.groupno, g.group_info, g.group_name FROM groups g INNER JOIN joingroups jg ON g.groupno = jg.groupno WHERE jg.uno LIKE ?1",nativeQuery=true)
    List<WoonGroup> findAllByGroups(String uno);
    
    //그룹 정보 업데이트
    /* @Query */
}