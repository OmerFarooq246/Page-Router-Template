import axios from "axios"
import Link from "next/link"
import { useState } from "react"
import {useRouter} from "next/navigation";

export default function Signup_form(){
    const [signupData, setSignupData] = useState({username: "", email: "", password: ""})
    const [error, setError] = useState({username: "", email: "", password: ""})
    const router = useRouter()

    function handleChange(event){
        const {id, value} = event.target
        setSignupData(prevSignupData => {return {...prevSignupData, [id]: value}})
    }

    function giveError(){
        Object.entries(signupData).map(([key, value]) => {
            if(value === ""){
                setError((prevError) => {return {...prevError, [key]: `- ${key} is empty -`}})
            }
            else{
                setError((prevError) => {return {...prevError, [key]: ""}})
            }
        })
    }

    async function handelSubmit(event){
        event.preventDefault()
        giveError()
        if(signupData.username !== "" &&
           signupData.email !== "" && 
           signupData.password !== ""
        ){
            try{
                const res = await axios.post("api/signup", {signupData: signupData})
                router.push("/login")
            }
            catch (error){
                if(error.request.status === 400){
                    setError((prevError) => {return {...prevError, ["email"]: "- email already registered -"}})
                }
                console.log("error in signup: ")
                console.log(error)
            }
        }
    }

    return(
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h3 className={`w-1/4 text-center bg-gray-900 text-gray-50 py-1.5 font-bold mb-2 font-figtree`}>Account SignUp</h3>
            <form onSubmit={handelSubmit} className="border border-gray-400 w-1/4 pt-4 py-5 px-4">
                <div className="mb-3 w-full">
                    <label htmlFor="username" className={`text-sm font-semibold mb-1 block font-figtree`}>Username</label>
                    <input onChange={handleChange} value={signupData.username} type="text" name="username" id="username" className="focus:outline-none focus:shadow border border-gray-400 text-sm px-2.5 pt-1.5 pb-1.5 w-full" />
                    {error.username && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.username}</p>}
                </div>
                <div className="mb-3 w-full">
                    <label htmlFor="email" className={`text-sm font-semibold mb-1 block font-figtree`}>Email</label>
                    <input onChange={handleChange} value={signupData.email} type="text" name="email" id="email" className="focus:outline-none focus:shadow border border-gray-400 text-sm px-2.5 pt-1.5 pb-1.5 w-full" />
                    {error.email && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.email}</p>}
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="password" className={`text-sm font-semibold mb-1 block font-figtree`}>Password</label>
                    <input onChange={handleChange} value={signupData.password} type="password" name="password" id="password" className="focus:outline-none focus:shadow border border-gray-400 text-sm px-2.5 pt-1.5 pb-1.5 w-full" />
                    {error.password && <p className="text-xs text-orange-700 mt-0.5 font-figtree">{error.password}</p>}
                </div>
                <div className="w-full flex flex-row space-x-2">
                    <button type="submit" className={`border border-gray-400 w-1/2 py-1.5 text-sm font-figtree font-semibold hover:bg-gray-900 hover:text-gray-50 hover:border-gray-50`}>SignUp</button>
                    <Link href="/" className={`text-center border border-gray-400 w-1/2 py-1.5 text-sm font-figtree font-semibold hover:bg-gray-900 hover:text-gray-50 hover:border-gray-50`}>Cancel</Link>
                </div>
            </form>
        </div>
    )
}