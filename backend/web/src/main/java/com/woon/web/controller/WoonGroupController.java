package com.woon.web.controller;

import java.util.HashMap;

import com.woon.web.domain.WoonGroupDTO;
import com.woon.web.entities.WoonGroup;
import com.woon.web.entities.WoonJoinGroup;
import com.woon.web.repositories.WoonGroupRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * WoonGroupController
 */
@CrossOrigin(origins = "http://localhost:8080", maxAge = 3600)
@RestController
@RequestMapping("/groups")
public class WoonGroupController {
    @Autowired WoonGroupRepository repo;
    @Autowired WoonGroupDTO groupDTO;

    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }
    //그룹의 개수
    @GetMapping("/count")
    public Long count() {
        return repo.count();
    }
    //그룹 생성
    @PostMapping("")
    public HashMap<String, String> save(@RequestBody WoonGroupDTO dto){
        System.out.println("Post save(dto) 입장");
        System.out.println("GROUP NAME: "+dto.getGroupName());
        System.out.println("GROUP LEADER: "+dto.getGroupInfo());
        HashMap<String, String> map = new HashMap<>();

        WoonGroup wgEntity = new WoonGroup();
        
        wgEntity.setGroupName(dto.getGroupName());
        wgEntity.setGroupInfo(dto.getGroupInfo());
//        entity.setGroupleader(dto.getGroupleader());
        System.out.println("엔티티로 바뀐 정보: "+ wgEntity.toString());
        repo.save(wgEntity);
        //WoonGroupJoin을 생성한다.
        //전제 조건 : 해당woonGroup pk값이 필요, 해당 User의 pk 값 필요
        WoonJoinGroup wjgEntity = new WoonJoinGroup();
        
        
        map.put("result", "SUCCESS");
        return map;
    }
    
}