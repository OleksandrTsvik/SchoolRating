export default function getObjectWithoutNullValues(obj: { [key: string]: any }) {
	// const obj = { foo: "bar", baz: 42, test: null };

	return Object.fromEntries( // Object { foo: "bar", baz: 42 }
		Object.entries(obj) // [ ['foo', 'bar'], ['baz', 42], ['test', null] ]
			.filter(([key, value]) => value !== null)
	);
}