package org.zerock.apiserver.account;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.zerock.apiserver.account.entity.AccountEntity;
import org.zerock.apiserver.account.repository.AccountRepository;
import org.zerock.apiserver.account.util.JWTUtil;

import java.util.Map;

@SpringBootTest
public class AccountRepositoryTests {

    @Autowired
    private AccountRepository repository;


    @Test
    public void testInsert() {

        for (int i = 1; i <= 100 ; i++) {

            String email = "user"+ i +"@aaa.com";

            AccountEntity entity = AccountEntity.builder()
                    .email(email)
                    .password("1111")
                    .nickname("USER"+i)
                    .role(  i < 80 ? "USER":"ADMIN")
                    .build();

            repository.save(entity);

        }//end for

    }
}
