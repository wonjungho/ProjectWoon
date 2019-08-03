package com.woon.web.common;

/**
 * MailService
 */
public interface MailService {

    void sendMail(String toEmail, String subject, String message);
}