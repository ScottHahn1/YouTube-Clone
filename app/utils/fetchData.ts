const fetchData = async <T>(url: string, errorMsg: string, options?: RequestInit) => {
	const res = await fetch(url, options);

	if (!res.ok) {
		throw new Error(errorMsg);
	};

	const data: T = await res.json();

	if (!data) throw new Error(`${errorMsg} - No data returned`);

	return data;
};

export default fetchData;