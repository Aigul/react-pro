import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const FOCUSABLE_SELECTOR = [
	'a[href]',
	'button:not([disabled])',
	'textarea:not([disabled])',
	'input:not([disabled])',
	'select:not([disabled])',
	'[tabindex]:not([tabindex="-1"])',
].join(', ');

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
};

const getModalRoot = (): HTMLElement => {
	let root = document.getElementById('modal-root');
	if (!root) {
		root = document.createElement('div');
		root.id = 'modal-root';
		document.body.appendChild(root);
	}
	return root;
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	const dialogRef = useRef<HTMLDivElement>(null);
	const onCloseRef = useRef(onClose);

	useEffect(() => {
		onCloseRef.current = onClose;
	}, [onClose]);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		// элемент, который был в фокусе (кнопка, открывшая модалку)
		const previouslyFocused = document.activeElement as HTMLElement | null;

		document.body.style.overflow = 'hidden';

		const focusFirst = () => {
			const first =
				dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
			(first ?? dialogRef.current)?.focus();
		};

		const trapFocus = (e: KeyboardEvent) => {
			const dialog = dialogRef.current;
			if (!dialog) {
				return;
			}
			const focusable = Array.from(
				dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
			);
			if (focusable.length === 0) {
				dialog.focus();
				e.preventDefault();
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			const active = document.activeElement;

			// Если фокус выпал из модалки — возвращаем его на первый элемент
			if (!dialog.contains(active)) {
				first.focus();
				e.preventDefault();
				return;
			}

			// Циклический переход по Tab / Shift+Tab внутри модалки
			if (e.shiftKey && active === first) {
				last.focus();
				e.preventDefault();
			} else if (!e.shiftKey && active === last) {
				first.focus();
				e.preventDefault();
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				onCloseRef.current();
				return;
			}
			if (e.key === 'Tab') {
				trapFocus(e);
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		focusFirst();

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = '';
			// возвращаем фокус на кнопку-триггер
			previouslyFocused?.focus();
		};
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	return createPortal(
		<div className={s.overlay} onClick={() => onCloseRef.current()}>
			<div
				className={s.dialog}
				role='dialog'
				aria-modal='true'
				tabIndex={-1}
				ref={dialogRef}
				onClick={(e) => e.stopPropagation()}>
				<button
					type='button'
					className={s.close}
					onClick={() => onCloseRef.current()}
					aria-label='Закрыть'>
					&times;
				</button>
				{children}
			</div>
		</div>,
		getModalRoot()
	);
};
