import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Modal({ handleEdit, oldTask }) {
  let [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(oldTask);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="flex-shrink-0	 p-2 ml-2 border-2 rounded text-yellow-500 border-yellow-500 hover:text-white hover:bg-yellow-500"
      >
        Edit task
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="border inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="div" className="flex justify-between">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Edit your task
                  </h3>

                  <AiOutlineCloseCircle
                    size={18}
                    color="red"
                    className="cursor-pointer"
                    onClick={closeModal}
                  />
                </Dialog.Title>
                <div className="mt-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    pattern="[A-Za-z0-9]+"
                    title="letters and numbers only, no  punctuation or special characters"
                    placeholder="update task"
                    className="mt-1 block w-full  border bg-gray-100 h-11 rounded-xl shadow-lg  hover:bg-blue-100 focus:bg-blue-100 focus:ring-0 p-3"
                  />
                </div>

                <div className="mt-4 float-right">
                  <button
                    type="button"
                    className="inline-flex  justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      handleEdit(value);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
