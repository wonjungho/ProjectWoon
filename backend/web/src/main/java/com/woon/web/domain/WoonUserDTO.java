package com.woon.web.domain;

import java.sql.Timestamp;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * WoonUserDTO
 */
@Data
@Lazy
@Component
public class WoonUserDTO {

    private String userEmail, userName, password, profile, profilePath;
    private Timestamp signupDate;

}