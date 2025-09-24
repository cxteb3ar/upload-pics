import { type Metadata } from "next";

const name = "Login Error - Upload Pics";

export const metadata: Metadata = {
  title: name,
};

enum Error {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  CredentialsSignin = "CredentialsSignin",
  Default = "Default",
}

const errorMap = {
  [Error.Configuration]: (
    <>
      <p>There was a problem when trying to authenticate.</p>
      <p>
        Error code:{" "}
        <code className="rounded-md bg-slate-200 px-1.5 py-1 text-xs dark:bg-[#323336]">
          Configuration
        </code>
      </p>
    </>
  ),
  [Error.CredentialsSignin]: (
    <>
      <p>Invaild Email or Password.</p>
      <p>
        Error code:{" "}
        <code className="rounded-md bg-slate-200 px-1.5 py-1 text-xs dark:bg-[#323336]">
          CredentialsSignin
        </code>
      </p>
    </>
  ),
  [Error.AccessDenied]: (
    <>
      <p>There was a problem when trying to authenticate.</p>
      <p>
        Error code:{" "}
        <code className="rounded-md bg-slate-200 px-1.5 py-1 text-xs dark:bg-[#323336]">
          AccessDenied
        </code>
      </p>
    </>
  ),
  [Error.Verification]: (
    <>
      <p>There was a problem when trying to authenticate.</p>
      <p>
        Error code:{" "}
        <code className="rounded-md bg-slate-200 px-1.5 py-1 text-xs dark:bg-[#323336]">
          Verification
        </code>
      </p>
    </>
  ),
  [Error.Default]: (
    <>
      <p>There was a problem when trying to authenticate.</p>{" "}
      <p>
        Error code:{" "}
        <code className="rounded-md bg-slate-200 px-1.5 py-1 text-xs dark:bg-[#323336]">
          Default
        </code>
      </p>
    </>
  ),
};

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error: Error }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="block rounded-lg bg-[#ffffff] p-6 text-center shadow-md dark:bg-[#1e1e22]">
        <h1 className="mb-2 flex flex-row items-center justify-center gap-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Something went wrong
        </h1>
        <div className="font-normal text-gray-700 dark:text-gray-400">
          {errorMap[error] || (
            <>
              <p>There was a problem when trying to authenticate.</p>
              <p>
                Error code:{" "}
                <code className="rounded-md bg-slate-200 px-1.5 py-1 text-xs dark:bg-[#323336]">
                  Unknown
                </code>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
