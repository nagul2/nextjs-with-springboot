package org.zerock.apiserver.cart.repository;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.zerock.apiserver.cart.entity.CartEntity;

import java.util.List;
import java.util.Optional;

public interface CartEntityRepository extends JpaRepository<CartEntity, Long>    {


    @EntityGraph(attributePaths = {"product", "product.images"})
    @Query("select c from CartEntity c where c.account = :account")
    List<CartEntity> findByAccount(@Param("account") String account);

}
