/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que retorne uma lista de usuários
 * - A request deve receber apenas o método GET
 * - A lista deve conter pelo menos 2 usuários
 * - Cada usuário deve ter um id, nome e email
 * - Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from 'next/types';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { ApiMethod } from '@/decorators/method';
import { IUser } from '@/types/user.d';

export default ApiMethod('GET')(async(req: NextApiRequest, res: NextApiResponse) => {
	const users: IUser[] = [];

	for (let i = 0; i < 10; i++ ) {
		const firstName = faker.person.firstName();
		users.push({
			id: faker.string.uuid(),
			name: firstName,
			email: faker.internet.email({ firstName: firstName})
		})
	}

	return res.status(200).json(users);
});
