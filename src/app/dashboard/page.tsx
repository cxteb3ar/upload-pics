import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import UploadPage from "./page-client";
import config from "@root/config";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    return redirect(`/auth/signin?callbackUrl=/dashboard`);
  }

  return (
    <>
      <UploadPage session={session} limit={config.images.limit} />
    </>
  );
}
