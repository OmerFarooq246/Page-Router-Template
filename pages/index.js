import BaseLayout from "@/components/BaseLayout/BaseLayout"
import Dashboard from "@/components/Dashboard/Dashboard"

export default function Index() {
  return (
    <BaseLayout title={"Home"}>
      <Dashboard />
    </BaseLayout>
  )
}
