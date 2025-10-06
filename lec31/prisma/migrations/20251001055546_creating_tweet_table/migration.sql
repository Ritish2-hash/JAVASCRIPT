-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "name" SET DEFAULT 'ritish';

-- CreateTable
CREATE TABLE "public"."Tweet" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "image" TEXT,
    "body" TEXT NOT NULL,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Tweet" ADD CONSTRAINT "Tweet_userid_fkey" FOREIGN KEY ("userid") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
