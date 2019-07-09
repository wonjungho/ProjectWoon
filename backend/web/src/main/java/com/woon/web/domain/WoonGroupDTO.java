package com.woon.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * WoonGroupDTO
 */
@Data@Component@Lazy
public class WoonGroupDTO {
    private Long groupno;
    private String groupname, groupintro;
}