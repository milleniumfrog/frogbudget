let counter = Number(localStorage.getItem('entry_id')) || 0;

/**
 * get unique id (++counter);
 */
export function getID() {
	const s = String(++counter);
	localStorage.setItem('entry_id', s);
	return s;
}