import { useEffect, useRef } from 'react';

/**
 * Возвращает предыдущее значение value.
 * На первом рендере возвращает undefined.
 *
 * useRef хранит значение между рендерами без вызова нового рендера,
 * а useEffect обновляет его после отрисовки — поэтому ref.current
 * всегда содержит значение с предыдущего рендера.
 */
export const usePrevious = <T>(value: T): T | undefined => {
	const ref = useRef<T | undefined>(undefined);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
};
