import { useUser } from "../Entities/User"

export default function HomePage () {
    const User = useUser()

    if (User.isLoguedIn())
        return (
            <div>Home...</div>
        )
}
