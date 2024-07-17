
CREATE TABLE "users_table" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "profile_pic" TEXT,
    "bio" TEXT,

    CONSTRAINT "users_table_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "recipe_table" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "ingredients" TEXT NOT NULL,
    "video_url" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "recipe_table_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "category_table" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "category_table_pkey" PRIMARY KEY ("id")
);


CREATE UNIQUE INDEX "users_table_username_key" ON "users_table"("username");


CREATE UNIQUE INDEX "users_table_email_key" ON "users_table"("email");


ALTER TABLE "recipe_table" ADD CONSTRAINT "recipe_table_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;


ALTER TABLE "recipe_table" ADD CONSTRAINT "recipe_table_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
