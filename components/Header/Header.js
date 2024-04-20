import { Figtree } from "next/font/google"
const figtree = Figtree({subsets: ['latin']})
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function Header(){
    const session = useSession()

    return(
        <header className={`sticky flex flex-row justify-between items-center min-h-10 h-10 pl-3.5 pr-5 ${figtree.className}`}>
            <div className="text-sm w-1/3 font-medium space-x-2.5">
                <Link href="/">Home</Link>
                <Link href="/auth">Auth</Link>
            </div>
            <h3 className="text-lg w-1/3 font-bold text-center">Page Router Template</h3>
            <div className="text-sm w-1/3 flex flex-row justify-end font-medium space-x-2.5">
                <Link href="/about">About</Link>
                {session.status === "unauthenticated" 
                ? <div className="flex flex-row space-x-2.5">
                    <Link href="/login">Login</Link>
                    <Link href="/signup">SignUp</Link>
                </div>
                : <div className="flex flex-row space-x-2.5">
                    <button onClick={() => signOut({ callbackUrl: '/login' })}>SignOut</button>
                </div>}
            </div>
        </header>
    )
}