-- DropForeignKey
ALTER TABLE "Accounts" DROP CONSTRAINT "Accounts_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
