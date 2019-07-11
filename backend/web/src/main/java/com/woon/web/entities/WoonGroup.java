package com.woon.web.entities;

import java.io.Serializable;

import javax.persistence.Entity;
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
    private Long groupno;
    private String groupname;
    private String groupintro;

    @Override
    public String toString(){
        return String.format("GROUP NO: %d\n"
                            +"GROUP NAME: %s\n"
                            +"GROUP INTRO: %s\n"
        , groupno, groupname, groupintro);
    }
    @Builder
    private WoonGroup(String groupname, String groupintro){
        this.groupname = groupname;
        this.groupintro = groupintro;
    }

}