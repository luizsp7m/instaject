import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <button
      type="button"
      className="text-slate-400 text-sm hover:text-slate-300 transition-colors z-10"
      onClick={() => signIn()}
    >
      Sign In
    </button>
  );
}