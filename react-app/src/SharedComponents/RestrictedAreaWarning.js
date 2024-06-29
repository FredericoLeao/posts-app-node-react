export default function ({ userLoguedIn }) {
    if (userLoguedIn ==! true)
        return (
            <div className="mt-3">
                <div>Área Restrita</div>
            </div>
        )
}