
function startDate(time: string) {
	const startDate =
		time &&
		new Date(parseInt(time) * 1000).toLocaleDateString('en-US', {
			day: '2-digit',
			month: 'short',
			year: 'numeric'
		});
	const startTime =
		time &&
		new Date(parseInt(time) * 1000).toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit'
		});
	return `${startDate} ${startTime}`;
}

export default startDate;
