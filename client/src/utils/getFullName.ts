interface User {
	firstName: string;
	lastName: string;
	patronymic: string;
}

export default function getFullName(user: User | null): string {
	return user
		? `${user.firstName} ${user.lastName} ${user.patronymic}`
		: '';
}