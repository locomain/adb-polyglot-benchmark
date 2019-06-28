/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     17-05-2019 23:11:03                          */
/*==============================================================*/


drop table if exists COMMENT;

drop table if exists COMMENT_LIKES;

drop table if exists LOCATION;

drop table if exists POST;

drop table if exists POST_TAGS;

drop table if exists TAG;

drop table if exists USER;

drop table if exists USERS_FRIENDS;

drop table if exists USER_LIKES;

/*==============================================================*/
/* Table: COMMENT                                               */
/*==============================================================*/
create table COMMENT
(
   EMAIL                varchar(255) not null,
   COMMENT_ID           bigint not null,
   POST_ID              int not null,
   COMMENT              text not null,
   primary key (EMAIL, COMMENT_ID)
);

/*==============================================================*/
/* Table: COMMENT_LIKES                                         */
/*==============================================================*/
create table COMMENT_LIKES
(
   COMMENT_ID           bigint not null,
   EMAIL                varchar(255) not null,
   COMMENTER_EMAIL      varchar(255) not null,
   primary key (COMMENTER_EMAIL, EMAIL, COMMENT_ID)
);

/*==============================================================*/
/* Table: LOCATION                                              */
/*==============================================================*/
create table LOCATION
(
   LOCATION_ID          bigint not null,
   EMAIL                varchar(255) not null,
   LATITUDE             decimal(9,6) not null,
   LONGITUDE            decimal(9,6) not null,
   DATE                 datetime not null,
   primary key (LOCATION_ID)
);

/*==============================================================*/
/* Table: POST                                                  */
/*==============================================================*/
create table POST
(
   POST_ID              int not null,
   LOCATION_ID          bigint,
   EMAIL                varchar(255) not null,
   TITLE                text not null,
   DESCRIPTION          text,
   DATE                 datetime not null,
   IMAGE                longblob not null,
   primary key (POST_ID)
);

/*==============================================================*/
/* Table: POST_TAGS                                             */
/*==============================================================*/
create table POST_TAGS
(
   TAG_ID               int not null,
   POST_ID              int not null,
   primary key (TAG_ID, POST_ID)
);

/*==============================================================*/
/* Table: TAG                                                   */
/*==============================================================*/
create table TAG
(
   TAG_ID               int not null,
   NAME                 varchar(255) not null,
   primary key (TAG_ID)
);

/*==============================================================*/
/* Table: USER                                                  */
/*==============================================================*/
create table USER
(
   EMAIL                varchar(255) not null,
   FIRST_NAME           varchar(255) not null,
   LAST_NAME            varchar(255) not null,
   PASSWORD             text not null,
   BIRTHDATE            datetime not null,
   primary key (EMAIL)
);

/*==============================================================*/
/* Table: USERS_FRIENDS                                         */
/*==============================================================*/
create table USERS_FRIENDS
(
   USER_1_EMAIL         varchar(255) not null,
   USER_2_EMAIL         varchar(255) not null,
   primary key (USER_1_EMAIL, USER_2_EMAIL)
);

/*==============================================================*/
/* Table: USER_LIKES                                            */
/*==============================================================*/
create table USER_LIKES
(
   EMAIL                varchar(255) not null,
   POST_ID              int not null,
   primary key (EMAIL, POST_ID)
);

alter table COMMENT add constraint FK_COMMENT_USER foreign key (EMAIL)
      references USER (EMAIL);

alter table COMMENT add constraint FK_POST_COMMENTS foreign key (POST_ID)
      references POST (POST_ID);

alter table COMMENT_LIKES add constraint FK_COMMENT_LIKES foreign key (EMAIL)
      references USER (EMAIL);

alter table COMMENT_LIKES add constraint FK_COMMENT_LIKES2 foreign key (COMMENTER_EMAIL, COMMENT_ID)
      references COMMENT (EMAIL, COMMENT_ID);

alter table LOCATION add constraint FK_USER_LOCATIONS foreign key (EMAIL)
      references USER (EMAIL);

alter table POST add constraint FK_IMAGE_LOCATION foreign key (LOCATION_ID)
      references LOCATION (LOCATION_ID);

alter table POST add constraint FK_USER_POSTS foreign key (EMAIL)
      references USER (EMAIL);

alter table POST_TAGS add constraint FK_POST_TAGS foreign key (TAG_ID)
      references TAG (TAG_ID);

alter table POST_TAGS add constraint FK_POST_TAGS2 foreign key (POST_ID)
      references POST (POST_ID);

alter table USERS_FRIENDS add constraint FK_USER_FRIENDS foreign key (USER_1_EMAIL)
      references USER (EMAIL);

alter table USERS_FRIENDS add constraint FK_USER_FRIENDS2 foreign key (USER_2_EMAIL)
      references USER (EMAIL);

alter table USER_LIKES add constraint FK_USER_LIKES foreign key (EMAIL)
      references USER (EMAIL);

alter table USER_LIKES add constraint FK_USER_LIKES2 foreign key (POST_ID)
      references POST (POST_ID);

