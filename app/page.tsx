import { signIn } from "@/auth"
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 md:p-16">
      <p>This will be the main app page when I get more done.</p>
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
        await signIn("github")
      }}
    >
      <button type="submit" className="border-white border-2 p-2 rounded-xl mt-2"><FontAwesomeIcon icon={faGithub}/> Sign-in with GitHub</button>
    </form>
  )
} 