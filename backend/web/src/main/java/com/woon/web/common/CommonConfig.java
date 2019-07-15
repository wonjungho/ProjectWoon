package com.woon.web.common;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * commonConfig
 */
@Configuration
public class CommonConfig {


    @Bean
    public ModelMapper modelMapper(){
        return new ModelMapper();
    }

    
}