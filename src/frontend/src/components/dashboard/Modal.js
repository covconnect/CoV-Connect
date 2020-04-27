import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Portal from '@reach/portal'

const ModalOverlay = styled('div')(
	{
		position: 'fixed',
		width: '100%',
		height: '100%',
		top: '0',
		left: '0',
		zIndex: '10',
	}
)

const ModalContainer = styled('div')(
	{
		position: 'fixed',
		width: '100%',
		height: '100%',
		top: '0',
		left: '0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: '10'
	}
)

const Modal = ({ 
    isOpen,
    onClose,
    children, 
}) => {

	useEffect(() => {
		if(isOpen){
			document.querySelector('body').style.filter = 'blur(3px)';
		} else {
			document.querySelector('body').style.filter = 'blur(0px)';
		}
	}, [isOpen])

	if(!isOpen){
			return null;
	}

	return (
			<Portal>
					<ModalOverlay />
			</Portal>
	)
}

Modal.propTypes = {
	children: PropTypes.element
}

export default Modal;