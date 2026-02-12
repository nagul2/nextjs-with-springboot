package org.zerock.apiserver.product.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProductEntity is a Querydsl query type for ProductEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProductEntity extends EntityPathBase<ProductEntity> {

    private static final long serialVersionUID = 465073643L;

    public static final QProductEntity productEntity = new QProductEntity("productEntity");

    public final DateTimePath<java.time.LocalDateTime> createdDate = createDateTime("createdDate", java.time.LocalDateTime.class);

    public final SetPath<ProductImage, QProductImage> images = this.<ProductImage, QProductImage>createSet("images", ProductImage.class, QProductImage.class, PathInits.DIRECT2);

    public final StringPath pname = createString("pname");

    public final NumberPath<Integer> pno = createNumber("pno", Integer.class);

    public final NumberPath<Double> price = createNumber("price", Double.class);

    public final BooleanPath sale = createBoolean("sale");

    public final StringPath writer = createString("writer");

    public QProductEntity(String variable) {
        super(ProductEntity.class, forVariable(variable));
    }

    public QProductEntity(Path<? extends ProductEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProductEntity(PathMetadata metadata) {
        super(ProductEntity.class, metadata);
    }

}

