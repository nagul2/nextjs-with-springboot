package org.zerock.apiserver.account.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QAccountEntity is a Querydsl query type for AccountEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAccountEntity extends EntityPathBase<AccountEntity> {

    private static final long serialVersionUID = -104570325L;

    public static final QAccountEntity accountEntity = new QAccountEntity("accountEntity");

    public final StringPath accessToken = createString("accessToken");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final StringPath email = createString("email");

    public final DateTimePath<java.time.LocalDateTime> joinDate = createDateTime("joinDate", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> modifiedDate = createDateTime("modifiedDate", java.time.LocalDateTime.class);

    public final StringPath nickname = createString("nickname");

    public final StringPath oldRefreshToken = createString("oldRefreshToken");

    public final StringPath password = createString("password");

    public final StringPath refreshToken = createString("refreshToken");

    public final StringPath role = createString("role");

    public QAccountEntity(String variable) {
        super(AccountEntity.class, forVariable(variable));
    }

    public QAccountEntity(Path<? extends AccountEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAccountEntity(PathMetadata metadata) {
        super(AccountEntity.class, metadata);
    }

}

