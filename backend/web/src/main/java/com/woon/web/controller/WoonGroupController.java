package com.woon.web.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;


import com.woon.web.common.CommonConfig;
import com.woon.web.domain.WoonGroupDTO;
import com.woon.web.entities.WoonGroup;
import com.woon.web.entities.WoonJoinGroup;
import com.woon.web.entities.WoonUser;
import com.woon.web.repositories.WoonGroupRepository;
import com.woon.web.repositories.WoonJoinGroupRepository;
import com.woon.web.repositories.WoonUserRepository;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * WoonGroupController
 */
@CrossOrigin(origins = "http://localhost:3000", maxAge = 3600)
@RestController
@RequestMapping("/groups")
public class WoonGroupController {
    @Autowired
    WoonGroupRepository groupRepo;
    @Autowired
    WoonUserRepository userRepo;
    @Autowired
    WoonJoinGroupRepository joinGroupRepo;
    @Autowired
    WoonGroupDTO groupDTO;
    @Autowired
    CommonConfig config;

    // 그룹의 개수
    @GetMapping("/count")
    public Long count() {
        return groupRepo.count();
    }

    // 그룹 생성
    /**
     * @param id  String
     * userid
     * @param dto WoonGroupDTO
     * @return HashMap
     */
    @PostMapping("/{id}")
    public HashMap<String, String> save(@PathVariable String id, @RequestBody WoonGroupDTO dto) {
        System.out.println("Post save(dto) 입장");
        // user id 정상적으롤 받았는지 확인
        System.out.println("USER ID: " + id);

        System.out.println("GROUP NAME: " + dto.getGroupName());
        System.out.println("GROUP LEADER: " + dto.getGroupInfo());
        HashMap<String, String> map = new HashMap<>();
        // woonGroup 생성 (먼저 생성)
        WoonGroup wgEntity = new WoonGroup();
        wgEntity.setGroupName(dto.getGroupName());
        wgEntity.setGroupInfo(dto.getGroupInfo());
        // woonJoinGroup 생성(woongroup 생성 후)
        WoonJoinGroup wjgEntity = new WoonJoinGroup();
        // woonJoingroup 엔터티에 woongroup data 입력
        wjgEntity.setWoonGroups(wgEntity);
        // woongroup 엔터티에 woonJoingroup data 입력
        wgEntity.setWoonJoingroups(Arrays.asList(wjgEntity));
        
        //그룹에 가입하는 user entity
        WoonUser userEntity = new WoonUser();
        // 해당 식별키에 해당하는 단일 엔티티 반환
        userEntity = userRepo.findById(Long.parseLong(id)).get();
        //woonjoingroup엔터티에 woonuser의 pk값 집어넣기.
        wjgEntity.setWoonUsers(userEntity);
        //그룹 생성하는 유저가 그룹 리더 -> groupleader 값 1을 가진다.
        wjgEntity.setGroupLeader("1");

        System.out.println("엔티티로 바뀐 정보: "+ wgEntity.toString());
        groupRepo.save(wgEntity);
        
        map.put("result", "SUCCESS");
        return map;
    }
    //가입한 그룹 목록 조회
    @GetMapping("/{id}")
    public List<WoonGroupDTO> findAllGroups(@PathVariable String id){
        System.out.println("findAllGroups 입장");
        Iterable<WoonGroup> entities = groupRepo.findAllByGroups(id);
        List<WoonGroupDTO> list = new ArrayList<>();
        for(WoonGroup g : entities){
            WoonGroupDTO dto = config.modelMapper().map(g, WoonGroupDTO.class);
            list.add(dto);
        }
        System.out.println(list);
        return list;
    }
    //그룹 삭제 (전제: 그룹리더인 경우)
    //tbl_groups 의 해당 그룹 record를 삭제하면 cascade 처리 결과 
    //tbl_joingroups 의 해당 레코드들도 동시에 삭제됨.
    @DeleteMapping("/{groupno}")
    public void deleteByid(@PathVariable Long groupno){
        System.out.println("deleteByid 입장. groupno: "+ groupno);
        groupRepo.deleteById(groupno);
    }

    //그룹 탈퇴 (전제: 그룹리더(X) and 그룹원인 경우)
    //  방장이 아닐 때(tbl_joingroups. group_leader 값이 0)
    //joingroups 테이블에서 delete
    //uno(유저pk) 와 현재 해당 groupno로 해당 record 접근 가능
    @DeleteMapping("/{uno}/{groupno}")
    public void deleteById(@PathVariable String uno, @PathVariable String groupno){
        joinGroupRepo.deleteByUnoAndGroupno(uno,groupno);
    } 

}