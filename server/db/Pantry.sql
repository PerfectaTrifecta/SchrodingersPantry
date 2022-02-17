CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" varchar,
  "password" varchar,
  "preference" varchar
);

CREATE TABLE "recipes" (
  "id" SERIAL PRIMARY KEY,
  "text" varchar,
  "vote_count" int,
  "comment_count" int
);

CREATE TABLE "bookmarks" (
  "id" SERIAL PRIMARY KEY,
  "url" varchar
);

CREATE TABLE "user_bookmark" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "bookmark_id" int
);

CREATE TABLE "favorites" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "recipe_id" int
);

CREATE TABLE "comments" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "recipe_id" int,
  "text" varchar
);

CREATE TABLE "votes" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "recipe_id" int
);

CREATE TABLE "tags" (
  "id" SERIAL PRIMARY KEY,
  "text" varchar
);

CREATE TABLE "recipe_tags" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int,
  "tag_id" int
);

CREATE TABLE "images" (
  "id" SERIAL PRIMARY KEY,
  "recipe_id" int,
  "img" varchar
);

ALTER TABLE "favorites" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "user_bookmark" ADD FOREIGN KEY ("bookmark_id") REFERENCES "bookmarks" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "favorites" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "user_bookmark" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "votes" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "votes" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipe_tags" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");

ALTER TABLE "recipe_tags" ADD FOREIGN KEY ("tag_id") REFERENCES "tags" ("id");

ALTER TABLE "images" ADD FOREIGN KEY ("recipe_id") REFERENCES "recipes" ("id");
