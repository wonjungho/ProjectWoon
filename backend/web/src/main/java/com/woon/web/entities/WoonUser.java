package com.woon.web.entities;

import java.sql.Timestamp;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * WoonUser
 */
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@Getter
@Setter
@ToString
@Table(name = "woon_users")
public class WoonUser {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long uno;

    @Column(name = "user_email", nullable = false, unique = true)
    private String userEmail;
    @Column(name = "user_name", nullable = false)
    private String userName;
    @Column(name = "password", nullable = false)
    private String password;
    @Column(name = "profile", nullable = true)
    private String profile;
    @Column(name = "profile_path", nullable = true)
    private String profilePath;

    @CreationTimestamp
    @Column(name = "signup_date", nullable = false)
    private Timestamp signupDate;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "woonUsers")
    private List<WoonJoinGroup> woonJoingroups;

}