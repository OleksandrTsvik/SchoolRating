interface User {
	firstName: string;
	lastName: string;
	patronymic: string;
}

export default function getFullName(user: User) {
	return `${user.firstName} ${user.lastName} ${user.patronymic}`;
}