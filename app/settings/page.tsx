import { signIn } from "@/auth"
import { faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center p-6 md:p-16">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <SignIn />
    </div>
  );
}
// temporary sign in button setup
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn()
      }}
    >
      <button type="submit" className="border-white border-2 p-2 rounded-xl mt-4"><FontAwesomeIcon icon={faSignIn}/> Sign in</button>
    </form>
  )
} 