package org.zerock.apiserver.account.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.zerock.apiserver.account.entity.AccountEntity;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<AccountEntity, String> {

    @Query("select a from AccountEntity a where a.refreshToken = :refreshToken or a.oldRefreshToken = :refreshToken")
    Optional<AccountEntity> findByRefreshToken( @Param("refreshToken") String refreshToken);

}
