package com.paulina.miplaylist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.paulina.miplaylist")
public class MiPlaylistApplication {
    public static void main(String[] args) {
        SpringApplication.run(MiPlaylistApplication.class, args);
    }
}
