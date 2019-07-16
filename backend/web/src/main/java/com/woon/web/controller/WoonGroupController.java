package com.woon.web.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Optional;

import com.woon.web.common.CommonConfig;
import com.woon.web.domain.WoonGroupDTO;
import com.woon.web.entities.WoonGroup;
import com.woon.web.entities.WoonJoinGroup;
import com.woon.web.entities.WoonUser;
import com.woon.web.repositories.WoonGroupRepository;
import com.woon.web.repositories.WoonUserRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
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
    WoonGroupRepository repo;
    @Autowired
    WoonUserRepository repoUser;
    @Autowired
    WoonGroupDTO groupDTO;
    @Autowired
    CommonConfig modelMapper;

    // 그룹의 개수
    @GetMapping("/count")
    public Long count() {
        return repo.count();
    }

    // 그룹 생성
    /**
     * @param id  String
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
        // woonGroup 생성
        WoonGroup wgEntity = new WoonGroup();
        wgEntity.setGroupName(dto.getGroupName());
        wgEntity.setGroupInfo(dto.getGroupInfo());
        // woonJoinGroup 생성
        WoonJoinGroup wjgEntity = new WoonJoinGroup();
        // woonJoingroup 엔터티에 woongroup data 입력
        wjgEntity.setWoonGroups(wgEntity);
        // woongroup 엔터티에 woonJoingroup data 입력
        wgEntity.setWoonJoingroups(Arrays.asList(wjgEntity));
        
        WoonUser userEntity = new WoonUser();
        // 해당 식별키에 해당하는 단일 엔티티 반환
        userEntity = repoUser.findById(Long.parseLong(id)).get();
        //woonjoingroup엔터티에 woonuser의 pk값 집어넣기.
        wjgEntity.setWoonUsers(userEntity);
        //그룹 생성하는 유저가 그룹 리더 -> groupleader 값 1을 가진다.
        wjgEntity.setGroupLeader("1");
        
        System.out.println("엔티티로 바뀐 정보: "+ wgEntity.toString());
        repo.save(wgEntity);
        //WoonGroupJoin을 생성한다.
        //전제 조건 : 해당woonGroup pk값이 필요, 해당 User의 pk 값 필요
//       WoonJoinGroup wjgEntity = new WoonJoinGroup();  
        map.put("result", "SUCCESS");
        return map;
    }
    
}