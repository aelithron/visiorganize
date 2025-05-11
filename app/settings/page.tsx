import { auth, signIn, signOut } from "@/auth"
import { faSignIn, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-16">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <SignInOrOut />
    </div>
  );
}

export async function SignInOrOut() {
  const session = await auth();
  if (!session?.user) {
    return (
      <form
        action={async () => {
          "use server"
          await signIn()
        }}
      >
        <button type="submit" className="border-white border-2 p-2 rounded-xl mt-4"><FontAwesomeIcon icon={faSignIn} /> Sign In</button>
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
        <button type="submit" className="border-white border-2 p-2 rounded-xl mt-4"><FontAwesomeIcon icon={faSignOut} /> Sign Out</button>
      </form>
    )
  }
} 