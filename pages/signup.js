import Signup_form from "@/components/SignUp/Signup"
import BaseLayout from "@/components/BaseLayout/BaseLayout"

export default function Signup(){
    return(
        <BaseLayout title={"SignUp"}>
            <Signup_form />
        </BaseLayout>
    )
}