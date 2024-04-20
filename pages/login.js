import Login_form from "@/components/Login/Login"
import BaseLayout from "@/components/BaseLayout/BaseLayout"

export default function Login(){
    return(
        <BaseLayout title={"Login"}>
            <Login_form />
        </BaseLayout>
    )
}