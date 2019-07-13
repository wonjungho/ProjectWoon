package com.woon.web.entities;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

/**
 * WoonGroup
 */
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Entity
@Getter
@Setter
@ToString
@Table(name = "groups")
public class WoonGroup implements Serializable {
    
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long groupno;
    
    @Column(name = "group_name", unique = true, nullable = false) 
    private String groupName;   
    @Column(name = "group_info", nullable = false) 
    private String groupInfo;
    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "WoonGroups")
    private List<WoonJoinGroup> woonJoingroups;

    @Override
    public String toString(){
        return String.format("GROUP NO: %d\n"
                            +"GROUP NAME: %s\n"
                            +"GROUP INFO: %s\n"
        , groupno, groupName, groupInfo);
    }
    @Builder
    private WoonGroup(String groupName, String groupInfo){
        this.groupName = groupName;
        this.groupInfo = groupInfo;
    }

}