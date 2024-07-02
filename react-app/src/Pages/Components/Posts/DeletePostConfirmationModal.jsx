import AppModal from '../../../SharedComponents/AppModal'

export default function DeletePostConfirmationModal ({ show, id, onSuccess = () => {}, onClosed = () => {} }) {
    const close = (e) => {
        onClosed(e)
    }

    return (
        <AppModal
            show={show}
            id={id}
            title="Confirma excluir post"
            onOkBtn={onSuccess}
            onClosed={close}
            okButtonValue="Excluir"
            okButtonDismiss={true}
        >
            <div className="row">
                <div>
                Deseja realmente exlcluir este Post ?
                </div>
            </div>
        </AppModal>
    )
}