package com.woon.web.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.woon.web.common.CommonConfig;
import com.woon.web.common.GmailService;
import com.woon.web.domain.WoonUserDTO;
import com.woon.web.entities.WoonUser;
import com.woon.web.repositories.WoonUserRepository;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * WoonUserController
 */
@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class WoonUserController {

    @Autowired
    WoonUserDTO user;
    @Autowired
    CommonConfig config;
    @Autowired
    WoonUserRepository repo;
    @Autowired
    GmailService gmail;

    // s3 관련
    private static final String BUCKET_NAME = "BUCKET_NAME";
    private static final String ACCESS_KEY = "ACCESS_KEY";
    private static final String SECRET_KEY = "SECRET_KEY";
    private static final String clientRegion = "ap-northeast-2";
    private AmazonS3 s3;
    private static final String cloudfront = "http:/cloudfront";

    // 회원가입
    @PostMapping("/signup")
    public void signup(@RequestParam("emailId") String id, @RequestParam("name") String name,
            @RequestParam("pass") String password,
            @RequestParam(value = "file", required = false) MultipartFile uploadfile) throws Exception {

        WoonUser entity = new WoonUser();
        entity.setUserEmail(id);
        entity.setPassword(password);
        entity.setUserName(name);

        String datePath = new SimpleDateFormat("/yyyy/MM/dd/HH").format(new Date());
        AWSCredentials awsCredentials = new BasicAWSCredentials(ACCESS_KEY, SECRET_KEY);
        s3 = AmazonS3ClientBuilder.standard().withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials)).build();

        if (uploadfile != null) {
            // 파일명 중복 방지
            String uName = UUID.randomUUID().toString();
            String ext = FilenameUtils.getExtension(uploadfile.getOriginalFilename());
            String convName = uName + "." + ext;
            // s3 업로드를 위해 multipart -> File convert
            File convfile = new File(convName);
            convfile.createNewFile();
            FileOutputStream fos = new FileOutputStream(convfile);
            fos.write(uploadfile.getBytes());
            fos.close();

            if (s3 != null) {
                try {
                    PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKET_NAME + datePath, convName,
                            convfile);
                    putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead); // file permission
                    s3.putObject(putObjectRequest);
                } catch (Exception e) {
                    // TODO: handle exception
                } finally {
                    s3 = null;
                }
            }
            entity.setProfile(uploadfile.getOriginalFilename());
            entity.setProfilePath(cloudfront + datePath + "/" + convName);
        }
        repo.save(entity);
    }

    // 로그인
    @PostMapping("/login")
    public WoonUserDTO login(@RequestBody WoonUserDTO dto) {
        return config.modelMapper().map(repo.findUserByUserEmailAndPassword(dto.getUserEmail(), dto.getPassword()),
                WoonUserDTO.class);
    }

    // 마이페이지
    @GetMapping("/mypage/{id}")
    public WoonUserDTO mypage(@PathVariable String id) {
        repo.findUserByUserEmail(id);
        return config.modelMapper().map(repo.findUserByUserEmail(id), WoonUserDTO.class);
    }

    // 비밀번호 수정
    @PutMapping("/modi")
    public void modiPass(@RequestBody WoonUserDTO dto) {
        WoonUser entity = new WoonUser();
        entity = repo.findUserByUserEmail(dto.getUserEmail());
        entity.setPassword(dto.getPassword());
        repo.save(entity);
    }

    // 탈퇴
    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable String id) {
        WoonUser entity = new WoonUser();
        entity = repo.findUserByUserEmail(id);
        repo.deleteById(entity.getUno());
    }

    // 개인정보 수정 (프로필사진)
    @PostMapping("/modiprofile")
    public WoonUserDTO profileImg(@RequestParam("user") String id, @RequestParam("file") MultipartFile uploadfile)
            throws Exception {
        WoonUser entity = new WoonUser();
        entity = repo.findUserByUserEmail(id);

        String datePath = new SimpleDateFormat("/yyyy/MM/dd/HH").format(new Date());
        AWSCredentials awsCredentials = new BasicAWSCredentials(ACCESS_KEY, SECRET_KEY);

        s3 = AmazonS3ClientBuilder.standard().withRegion(clientRegion)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials)).build();

        // 파일명 중복 방지
        String uName = UUID.randomUUID().toString();
        String ext = FilenameUtils.getExtension(uploadfile.getOriginalFilename());
        String convName = uName + "." + ext;
        // s3 업로드를 위해 multipart -> File convert
        File convfile = new File(convName);
        convfile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convfile);
        fos.write(uploadfile.getBytes());
        fos.close();

        if (s3 != null) {
            try {
                PutObjectRequest putObjectRequest = new PutObjectRequest(BUCKET_NAME + datePath, convName, convfile);
                putObjectRequest.setCannedAcl(CannedAccessControlList.PublicRead); // file permission
                s3.putObject(putObjectRequest);
            } catch (Exception e) {
                // TODO: handle exception
            } finally {
                s3 = null;
            }
        }
        entity.setProfile(uploadfile.getOriginalFilename());
        entity.setProfilePath(cloudfront + datePath + "/" + convName);

        repo.save(entity);
        return config.modelMapper().map(entity, WoonUserDTO.class);
    }

    // 비밀번호 찾기
    @PostMapping("/findpass")
    public WoonUserDTO tempPassMail(@RequestBody WoonUserDTO dto) {
        WoonUser entity = new WoonUser();
        entity = repo.findUserByUserEmailAndUserName(dto.getUserEmail(), dto.getUserName());

        // 임시비밀번호 생성
        Random rd = new Random();
        StringBuffer sb = new StringBuffer();

        for (int i = 0; i < 6; i++) {
            if (rd.nextBoolean()) {
                sb.append((char) ((int) (rd.nextInt(26)) + 97));
            } else {
                sb.append((rd.nextInt(10)));
            }
        }
        entity.setPassword(sb.toString());
        repo.save(entity);

        String subject = "[Woon] 요청하신 아이디의 임시비밀번호 입니다.";
        String content = "<!DOCTYPE html>" + "<html lang='en'>" + "<head>" + "    <meta charset='UTF-8'>"
                + "    <meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                + "    <meta http-equiv='X-UA-Compatible' content='ie=edge'>" + "    <title>Document</title>"
                + "</head>" + "<body>" + dto.getUserName() + "님의 요청에 의해 임시 비밀번호를 발급해 드립니다.</p><p>" + "임시 비밀번호 : "
                + sb.toString() + "</p>" + "<p>로그인 후에 비밀번호를 반드시 변경해주십시오.</p>" + "</body>" + "</html>";

        gmail.sendMail(dto.getUserEmail(), subject, content);

        return config.modelMapper().map(entity, WoonUserDTO.class);
    }
}