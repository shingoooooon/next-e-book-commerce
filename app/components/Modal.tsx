type ModalProps = {
    handlePurchaseConfirm: () => void
    handleCancel: () => void
  }

const Modal = ({ handlePurchaseConfirm, handleCancel }: ModalProps) => {
return (
    <div className="fixed inset-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal">
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-xl mb-4">Buy this book?</h3>
              <button onClick={handlePurchaseConfirm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                Buy
              </button>
              <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                Cancel
              </button>
            </div>
          </div>
)
}

export default Modal