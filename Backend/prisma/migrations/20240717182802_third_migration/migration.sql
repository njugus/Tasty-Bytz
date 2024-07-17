-- DropIndex
DROP INDEX "users_table_username_key";

-- AlterTable
ALTER TABLE "users_table" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user',
ALTER COLUMN "username" DROP NOT NULL;
