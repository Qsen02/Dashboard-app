export function transformDate(dateString: string | undefined) {
	if (dateString) {
		const date = new Date(dateString);
		return date.toLocaleDateString();
	}
	return "";
}
