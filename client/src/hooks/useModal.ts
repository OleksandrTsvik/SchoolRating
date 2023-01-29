import { useState } from 'react';

export default function useModal(initIsOpen = false) {
	const [isOpen, setIsOpen] = useState(initIsOpen);

	function onOpen() {
		setIsOpen(true);
	}

	function onClose() {
		setIsOpen(false);
	}

	function onToggle() {
		setIsOpen(state => !state);
	}

	return { onOpen, onClose, isOpen, onToggle };
}