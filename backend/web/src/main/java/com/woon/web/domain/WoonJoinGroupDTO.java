package com.woon.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * WoonJoinGroupDTO
 */
@Data@Component@Lazy
public class WoonJoinGroupDTO {
    private Long jgrno, uno, groupno;
    private String groupLeader;
}