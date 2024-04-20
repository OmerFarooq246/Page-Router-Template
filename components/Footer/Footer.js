import { Figtree } from "next/font/google"
const figtree = Figtree({subsets: ['latin']})

export default function Footer(){
    return(
        <footer className={`text-sm flex flex-row justify-center items-center min-h-10 h-10 pl-3.5 pr-5 ${figtree.className}`}>
            <p className="text-xs">Copyright - Page Router Template - 2024 All rights Unreserved</p>
        </footer>
    )
}