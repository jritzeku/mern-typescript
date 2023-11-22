
import React, { ReactNode, useEffect } from 'react'
import ReactDOM from 'react-dom'
import useDisableBodyScroll from '../hooks/useDisableBodyScroll'

interface IProps {
    width: string
    open: boolean
    onClose: () => void
    children: ReactNode;
}

const Modal: React.FC<IProps> = ({
    width,
    open,
    onClose,
    children,
}) => {
    useDisableBodyScroll(open)

    if (!open) return null

    return ReactDOM.createPortal(
        <>
            <div
                onClick={

                    () => {
                        console.log(' closing modal...')
                        onClose()
                    }
                }
                className='overflow-y-scroll h-screen  fixed inset-x-0 backdrop-blur-[4px] z-20 flex items-center justify-center  '
            >
                <div
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className='  bg-white py-8 rounded-sm shadow-md'
                    style={{ width: `${width}` }}
                >
                    {children}
                </div>
            </div>
        </>,
        document.getElementById('portal') as HTMLElement
    )
}

export default Modal

/*
NOTES:

https://stackoverflow.com/questions/63520680/argument-of-type-htmlelement-null-is-not-assignable-to-parameter-of-type-el
*/