package org.zerock.apiserver.cart.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCartEntity is a Querydsl query type for CartEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCartEntity extends EntityPathBase<CartEntity> {

    private static final long serialVersionUID = -1107336667L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCartEntity cartEntity = new QCartEntity("cartEntity");

    public final StringPath account = createString("account");

    public final DateTimePath<java.time.LocalDateTime> addCartDate = createDateTime("addCartDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> cno = createNumber("cno", Long.class);

    public final org.zerock.apiserver.product.entity.QProductEntity product;

    public final NumberPath<Integer> quantity = createNumber("quantity", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> updateCartDate = createDateTime("updateCartDate", java.time.LocalDateTime.class);

    public QCartEntity(String variable) {
        this(CartEntity.class, forVariable(variable), INITS);
    }

    public QCartEntity(Path<? extends CartEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCartEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCartEntity(PathMetadata metadata, PathInits inits) {
        this(CartEntity.class, metadata, inits);
    }

    public QCartEntity(Class<? extends CartEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.product = inits.isInitialized("product") ? new org.zerock.apiserver.product.entity.QProductEntity(forProperty("product")) : null;
    }

}

