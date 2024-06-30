import { Modal } from 'bootstrap'
import { useEffect, useRef } from 'react'

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function AppModal (
  {
    children,
    title,
    show=false,
    okButtonValue='OK',
    okButtonDismiss=false,
    cancelButtonValue='Fechar',
    onOkBtn=() => {},
    onCancelBtn=() => {},
    onClosed=() => {},
  }
) {
  const prevShow = usePrevious(show)
  useEffect(() => {
    if (prevShow !== show && show === true) {
        const appModal = new Modal(document.getElementById('appModal'))
        document.getElementById('appModal').addEventListener('hidden.bs.modal', onClosed)
        appModal.show()
    }
  }, [show])
  return (
      <div className="modal fade" id="appModal" data-bs-backdrop="static" data-bs-keyboard="true" tabIndex="-1" aria-labelledby="ariaLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">{title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={onCancelBtn}
              >{cancelButtonValue}</button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss={okButtonDismiss === true ? 'modal' : ''}
                onClick={onOkBtn}
              >{okButtonValue}</button>
            </div>
          </div>
        </div>
      </div>
  )
}
