const fetchData = async <T>(url: string, errorMsg: string) => {
	const res = await fetch(url);

	if (!res.ok) {
		throw new Error(errorMsg);
	};

	const data: T = await res.json();

	if (!data) throw new Error(`${errorMsg} - No data returned`);

	return data;
};

export default fetchData;