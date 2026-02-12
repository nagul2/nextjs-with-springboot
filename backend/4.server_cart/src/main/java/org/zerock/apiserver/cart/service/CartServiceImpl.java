package org.zerock.apiserver.cart.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.zerock.apiserver.cart.dto.CartDTO;
import org.zerock.apiserver.cart.dto.ChangeCartDTO;
import org.zerock.apiserver.cart.entity.CartEntity;
import org.zerock.apiserver.cart.repository.CartEntityRepository;
import org.zerock.apiserver.product.entity.ProductEntity;
import org.zerock.apiserver.product.repository.ProductRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Log4j2
public class CartServiceImpl implements CartService{

    private final CartEntityRepository repository;

    private final ProductRepository productRepository;

    @Override
    public List<CartDTO> addCart(ChangeCartDTO changeCartDTO) {

        List<CartEntity> cartEntityList = repository.findByAccount(changeCartDTO.getAccount());

        CartEntity target = cartEntityList.stream().filter(entity -> entity.getProduct().getPno().equals(changeCartDTO.getPno())).findFirst().orElse(null);

        if(target != null) {
            target.changeQuantity( target.getQuantity() +   changeCartDTO.getQuantity());

            if(target.getQuantity() <= 0) {
                repository.deleteById(target.getCno());
                cartEntityList.remove(target);
            }
        }else {

            ProductEntity productEntity = productRepository.selectOne(changeCartDTO.getPno());

            CartEntity entity = CartEntity.builder()
                    .account(changeCartDTO.getAccount())
                    .product(productEntity)
                    .quantity(changeCartDTO.getQuantity())
                    .build();

            repository.save(entity);
            cartEntityList.add(entity);
        }
       return cartEntityList.stream().map(entity ->new CartDTO(entity)).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    @Override
    public List<CartDTO> getCart(String account) {

        List<CartEntity> cartEntityList = repository.findByAccount(account);

        if(cartEntityList != null && cartEntityList.size() > 0) {
            return cartEntityList.stream().map(entity -> new CartDTO(entity)).collect(Collectors.toList());
        }

        return new ArrayList<>();
    }
}
