-- CreateTable
CREATE TABLE "Code" (
    "codeId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("codeId")
);

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
