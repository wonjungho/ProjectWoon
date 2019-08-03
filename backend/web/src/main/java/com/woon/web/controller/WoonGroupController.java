package com.woon.web.controller;

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
@CrossOrigin(origins = "*", maxAge = 3600)
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
     * @param id  String userid
     * @param dto WoonGroupDTO
     * @return HashMap
     */
    @PostMapping("/{id}")
    public HashMap<String, String> save(@PathVariable String id, @RequestBody WoonGroupDTO dto) {
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

        // 그룹에 가입하는 user entity
        WoonUser userEntity = new WoonUser();
        // 유저 이메일로 해당하는 단일 엔티티 반환
        userEntity = userRepo.findUserByUserEmail(id);
        // woonjoingroup엔터티에 woonuser의 pk값 집어넣기.
        wjgEntity.setWoonUsers(userEntity);
        // 그룹 생성하는 유저가 그룹 리더 -> groupleader 값 1을 가진다.
        wjgEntity.setGroupLeader("1");

        groupRepo.save(wgEntity);

        map.put("result", "SUCCESS");
        return map;
    }

    // 그룹 가입
    @PostMapping("/{id}/{groupno}")
    public HashMap<String, String> joinGroup(@PathVariable String id, @PathVariable String groupno) {
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
        // woonjoingroup엔터티에 woonuser의 pk값 집어넣기.
        wjgEntity.setWoonUsers(userEntity);
        // 수정내용 적용
        joinGroupRepo.save(wjgEntity);

        map.put("result", "SUCCESS");
        return map;
    }

    // 가입한 그룹 목록 조회
    @GetMapping("/list/{id}")
    public List<Object[]> findAllGroups(@PathVariable String id) {
        // 유저 pk값 구하기
        // 1. 유저 이메일로 단일 유저 엔터티 구하기
        // 2. 가져온 유저 엔터티에서 uno(pk)값 구하기
        WoonUser userEntity = userRepo.findUserByUserEmail(id);
        Long uno = userEntity.getUno();
        List<Object[]> gList = groupRepo.findAllByUno(uno);
        return gList;
    }

    // 가입한 하나의 그룹 정보 조회
    @GetMapping("/{groupno}")
    public WoonGroupDTO findByGroupno(@PathVariable Long groupno) {
        WoonGroup wgEntity = groupRepo.findByGroupno(groupno);
        WoonGroupDTO dto = config.modelMapper().map(wgEntity, WoonGroupDTO.class);
        return dto;
    }

    // 가입한 그룹의 리더인지 판단.
    @GetMapping("/chkLeader/{id}/{groupno}")
    public String checkLeader(@PathVariable String id, @PathVariable Long groupno) {
        WoonUser userEntity = userRepo.findUserByUserEmail(id);
        Long uno = userEntity.getUno();
        String chkLeader = joinGroupRepo.checkLeader(uno, groupno);
        return chkLeader;
    }

    // 그룹 삭제 (전제: 그룹리더인 경우)
    // tbl_groups 의 해당 그룹 record를 삭제하면 cascade 처리 결과
    // tbl_joingroups 의 해당 레코드들도 동시에 삭제됨.
    @DeleteMapping("/delete/{groupno}")
    public void deleteById(@PathVariable Long groupno) {
        groupRepo.deleteById(groupno);
    }

    // 그룹 탈퇴 (전제: 그룹리더(X) and 그룹원인 경우)
    // 방장이 아닐 때(tbl_joingroups. group_leader 값이 0)
    // joingroups 테이블에서 delete
    // uno(유저pk) 와 현재 해당 groupno로 해당 record 접근 가능
    @DeleteMapping("/delete/{id}/{groupno}")
    public void deleteByUnoAndGroupno(@PathVariable String id, @PathVariable Long groupno) {
        // 유저 이메일로 단일 user 엔터티 가져오기.
        WoonUser userEntity = userRepo.findUserByUserEmail(id);
        Long uno = userEntity.getUno();
        joinGroupRepo.deleteByUnoAndGroupno(uno, groupno);
    }

    // 그룹 수정 (그룹 리더인 경우)
    @PutMapping("/modi")
    public HashMap<String, String> update(@RequestBody WoonGroupDTO dto) {
        HashMap<String, String> map = new HashMap<>();
        WoonGroup wgEntity = groupRepo.findById(dto.getGroupno()).get();
        wgEntity.setGroupInfo(dto.getGroupInfo());
        groupRepo.save(wgEntity);
        map.put("result", "SUCCESS");
        return map;
    }

    // 그룹원 초대 처리 필요
    @GetMapping("/inviteUser/{email}")
    public void UserInvite(@PathVariable String email) {
        String content = "<h1>Hello! We are woon!</h1>";
        mail.sendMail(email, "초대이메일입니다", content);
    }

    @GetMapping("/test")
    public String test() {
        return "성공";
    }
}