import { useEffect } from 'react'

import React from 'react'
const useDisableBodyScroll = (open: any) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'scroll'
    }
  }, [open])

  return (
    <div>

    </div>
  )
}

export default useDisableBodyScroll

/*
TODO:

-For re-usability, we set this as hook since need for other popup modals 

    ->source: https://stackoverflow.com/questions/54989513/react-prevent-scroll-when-modal-is-open
*/
