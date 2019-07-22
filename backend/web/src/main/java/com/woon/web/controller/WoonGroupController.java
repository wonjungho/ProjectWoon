package com.woon.web.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;


import com.woon.web.common.CommonConfig;
import com.woon.web.common.GmailService;
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
import org.springframework.web.bind.annotation.PutMapping;
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
    @Autowired
    GmailService mail;

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
        System.out.println("USER EMAIL: " + id);

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
        // 유저 이메일로 해당하는 단일 엔티티 반환
        userEntity = userRepo.findUserByUserEmail(id);
        //woonjoingroup엔터티에 woonuser의 pk값 집어넣기.
        wjgEntity.setWoonUsers(userEntity);
        //그룹 생성하는 유저가 그룹 리더 -> groupleader 값 1을 가진다.
        wjgEntity.setGroupLeader("1");

        System.out.println("엔티티로 바뀐 정보: "+ wgEntity.toString());
        groupRepo.save(wgEntity);
        
        map.put("result", "SUCCESS");
        return map;
    }
    //그룹 가입
    @PostMapping("/{id}/{groupno}")
    public HashMap<String, String> joinGroup(@PathVariable String id, @PathVariable String groupno) {
        System.out.println("insertGroup 입장");
        // group no 정상적으롤 받았는지 확인
        System.out.println("User email: " + id);
        System.out.println("Group no: " + groupno);
        HashMap<String, String> map = new HashMap<>();
        
        // 해당 woonGroup 가져오기
        WoonGroup wgEntity = groupRepo.findById(Long.parseLong(groupno)).get();
        
        // woonJoinGroup 생성
        WoonJoinGroup wjgEntity = new WoonJoinGroup();
        // woonJoingroup 엔터티에 woongroup data 입력
        wjgEntity.setWoonGroups(wgEntity);
        
        wjgEntity.setGroupLeader("0");
        // 유저 이메일로 단일 user 엔터티 가져오기.
        WoonUser userEntity = userRepo.findUserByUserEmail(id);
        //woonjoingroup엔터티에 woonuser의 pk값 집어넣기.
        wjgEntity.setWoonUsers(userEntity);
        //수정내용 적용
        joinGroupRepo.save(wjgEntity);
        System.out.println("엔티티로 바뀐 정보: "+ wjgEntity.toString());
        map.put("result", "SUCCESS");
        return map;
    }
    //가입한 그룹 목록 조회
    @GetMapping("/list/{id}")
    public List<WoonGroupDTO> findAllGroups(@PathVariable String id){
        System.out.println("findAllGroups 입장");
        //유저 pk값 구하기
        //1. 유저 이메일로 단일 유저 엔터티 구하기
        //2. 가져온 유저 엔터티에서 uno(pk)값 구하기
        WoonUser userEntity = userRepo.findUserByUserEmail(id);
        
        Long uno =userEntity.getUno();
        Iterable<WoonGroup> entities = groupRepo.findAllByUno(uno);
        HashMap<String, String> map = new HashMap<String, String>();
        
        List<HashMap<String, String>> list = new ArrayList<HashMap<String,String>>();
        
        //for (int i = 0; i < entities.; i++) {
        //    
        //}
        int i = 0;
        for(WoonGroup g : entities){
            //WoonGroupDTO dto = config.modelMapper().map(g, WoonGroupDTO.class);
            map.put("groupno", Long.toString(g.getGroupno()));
            map.put("groupInfo", g.getGroupInfo());
            map.put("groupName", g.getGroupName());
            list.add(map);
            i++;
        }
        
        System.out.println(list);
        return null;
    }
    //그룹원 목록 조회
    
    //그룹 삭제 (전제: 그룹리더인 경우)
    //  tbl_groups 의 해당 그룹 record를 삭제하면 cascade 처리 결과 
    //  tbl_joingroups 의 해당 레코드들도 동시에 삭제됨.
    @DeleteMapping("/delete/{groupno}")
    public void deleteById(@PathVariable Long groupno){
        System.out.println("deleteById 입장. groupno: "+ groupno);
        groupRepo.deleteById(groupno);
        
    }

    //그룹 탈퇴 (전제: 그룹리더(X) and 그룹원인 경우)
    //  방장이 아닐 때(tbl_joingroups. group_leader 값이 0)
    //  joingroups 테이블에서 delete
    //  uno(유저pk) 와 현재 해당 groupno로 해당 record 접근 가능
    @DeleteMapping("/delete/{id}/{groupno}")
    public void deleteByUnoAndGroupno(@PathVariable String id, @PathVariable Long groupno){
        System.out.println("deleteByUnoAndGroupno 입장, user email: "+id+", groupno: "+groupno);
        // 유저 이메일로 단일 user 엔터티 가져오기.
        WoonUser userEntity = userRepo.findUserByUserEmail(id);
        Long uno = userEntity.getUno();
        joinGroupRepo.deleteByUnoAndGroupno(uno,groupno);
    }
    //그룹 수정 (그룹 리더인 경우)
    @PutMapping("/modi")
    //public HashMap<String, String> update(@RequestBody WoongroupDTO @PathVariable String groupno, @PathVariable String groupInfo){
    public HashMap<String, String> update(@RequestBody WoonGroupDTO dto){    
        System.out.println("update 입장. groupno: "+ dto.getGroupno() 
                            +", groupInfo: "+dto.getGroupInfo());
        HashMap<String, String> map = new HashMap<>();
        WoonGroup wgEntity = groupRepo.findById(dto.getGroupno()).get();
        wgEntity.setGroupInfo(dto.getGroupInfo());
        groupRepo.save(wgEntity);
        map.put("result", "SUCCESS");
        return map;
    }
    //그룹원 초대 처리 필요
   @GetMapping("/inviteUser/{email}")
   public void UserInvite(@PathVariable String email){
       System.out.println(email);
       String content = "<h1>Hello! We are woon!</h1>";
       mail.sendMail(email, "초대이메일입니다",content);
   }
    
}