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
    //내가 가입하거나 생성한 그룹 목록 조회
    @Query(value = "SELECT g.groupno, g.group_info, g.group_name, jg.group_leader FROM tbl_groups g INNER JOIN tbl_joingroups jg ON g.groupno = jg.groupno WHERE jg.uno LIKE ?1",nativeQuery=true)
    List<Object[]> findAllByUno(Long uno);
    @Query(value = "SELECT g.groupno, g.group_info, g.group_name FROM tbl_groups g INNER JOIN tbl_joingroups jg ON g.groupno = jg.groupno WHERE jg.uno LIKE ?1 AND g.group LIKE ?2",nativeQuery=true)
    WoonGroup findByUnoAndGroupno(Long uno, Long groupno);
    
    WoonGroup findByGroupno(Long groupno);
    
}
    