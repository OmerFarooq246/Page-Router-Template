import { useSession } from "next-auth/react"

export default function Dashboard(){
    const session = useSession()

    return(
        <div>
            <h1>{`Greetings ${session.data?.user?.username}`}</h1>
        </div>
    )
}