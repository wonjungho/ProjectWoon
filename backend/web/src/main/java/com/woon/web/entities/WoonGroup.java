package com.woon.web.entities;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
    @OneToMany //(WoonGroup <->WoonGroupDetail)
    private Long groupno;
    
    @Column(name = "group_name", nullable = false) private String groupName;   
    @Column(name = "group_info", nullable = false) private String groupInfo;
    //table 연관 관계 설정
    //(WoonGroup <-> WoonUser)    
    @ManyToOne
    @JoinColumn(name="uno")
    private WoonUser uno;
    

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