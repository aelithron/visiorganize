import { auth, signIn, signOut } from "@/auth"
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export default async function Page() {
  const session = await auth();
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-16">
      <h1 className="text-3xl font-semibold">Settings</h1>
      {session?.user && <div className="flex gap-2 bg-slate-300 dark:bg-slate-700 p-4 rounded-lg my-2 items-center">
        {session.user.image ?
          <Image src={session.user.image} alt="The user's profile picture." width={60} height={60} className="rounded-full" /> :
          <div className="w-15 h-15 bg-violet-300 rounded-full" />
        }
        <div>
          <p className="text-lg font-semibold">{session.user.name}</p>
          <p className="text-md text-slate-700 dark:text-slate-300">{session.user.email}</p>
        </div>
      </div>}
      <SignInOrOut />
      <div className="flex gap-1 text-slate-500 dark:text-slate-400 mt-4">
        <a href="https://github.com/aelithron/visiorganize" className="hover:text-sky-500 underline">Visiorganize</a>
        <p>{process.env.IMAGE_TAG || "No Version Available"} by Aelithron</p>
      </div>
    </div>
  );
}

async function SignInOrOut() {
  const session = await auth();
  if (!session?.user) {
    return (
      <form
        action={async () => {
          "use server"
          await signIn()
        }}
      >
        <button type="submit" className="border-black dark:border-white border-2 p-2 rounded-xl mt-4"><FontAwesomeIcon icon={faSignIn} /> Sign In</button>
      </form>
    )
  } else {
    return (
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit" className="border-black dark:border-white border-2 p-2 rounded-xl mt-4"><FontAwesomeIcon icon={faSignOut} /> Sign Out</button>
      </form>
    )
  }
}