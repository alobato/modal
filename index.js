import React, { forwardRef, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import useKeyPress from '@alobato/use-key-press'
import useLockBodyScroll from '@alobato/use-lock-body-scroll'

const Portal = ({children}) => createPortal(children, document.getElementById('modal-root'))

const Backdrop = forwardRef(({onClick, zIndex = 1000, style}, ref) => (
  <div ref={ref} style={{position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: 'black', opacity: 0, zIndex: zIndex, outline: 'none', tabIndex: -1, ...style}} onClick={onClick} />
))

export default ({render, className, onCloseCompleted = () => {}, zIndex = 1001, hasBackdrop = true, clickOutsideDisabled = false, backdropOpacity = 0.6, exitAnimation, enterAnimation, backdropStyle}) => {
  if (hasBackdrop) useLockBodyScroll()

  const modal = useRef()
  const backdrop = useRef()
  let initialOpacity = 0

  const handleExit = () => {
    if (exitAnimation) {
      exitAnimation(modal, backdrop, backdropOpacity, onCloseCompleted)
    } else {
      onCloseCompleted()
    }
  }

  useEffect(() => {
    if (enterAnimation) {
      enterAnimation(modal, backdrop, backdropOpacity)
    } else {
      modal.current.style.opacity = 1
      modal.current.style.transform = 'translateY(0)'
      backdrop.current.style.opacity = backdropOpacity
    }
  }, [backdropOpacity, enterAnimation])
  
  const escPress = useKeyPress('Escape') 
  if (escPress) handleExit()

  return (
    <Portal>
      <div className={className} ref={modal} tabIndex='-1' style={{opacity: initialOpacity, position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: zIndex, overflow: 'hidden', pointerEvents: 'none', outline: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div>
          {render({onRequestClose: handleExit})}
        </div>
      </div>
      {hasBackdrop &&
        <Backdrop
          style={backdropStyle}
          ref={backdrop}
          onClick={() => {
            if (clickOutsideDisabled) return false
            handleExit()
          }} />
      }      
    </Portal>
  )
}
