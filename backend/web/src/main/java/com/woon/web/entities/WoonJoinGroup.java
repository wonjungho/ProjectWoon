package com.woon.web.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * WoonJoinGroup
 */
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@Getter
@Setter
@ToString
@Table(name = "tbl_joingroups")
public class WoonJoinGroup implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long jgrno;
    
    @Column(name = "group_leader", nullable = false
            , columnDefinition = "varchar(255) default '0'")
    private String groupLeader;

    @ManyToOne
    @JoinColumn(name="groupno")
    private WoonGroup WoonGroups;

    @ManyToOne
    @JoinColumn(name="uno")
    private WoonUser woonUsers;

}