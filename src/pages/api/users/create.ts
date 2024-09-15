/**
 * @api {get} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * - Crie uma API que registre um usuário no array users
 * - A request deve receber apenas o método POST
 * - A request deve receber um body com os dados do usuário
 * - O body vai seguir a interface IUserCreate, removendo o id
 * - Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiRequest, NextApiResponse } from 'next/types';
import { ApiMethod } from '@/decorators/method';
import { IUserCreate } from '@/types/user.d';

export default ApiMethod('POST')(async (req: NextApiRequest, res: NextApiResponse) => {

	const { email, name } = req.body as IUserCreate;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
	const espacoBranco = /\S+/

	if (!email || !emailRegex.test(email)) {
		return res.status(400).json({ error: 'Email inválido' });
	} else if (!name || !espacoBranco.test(name)) {
		return res.status(400).json({ error: 'Existem Campos em branco' });
	} else {
		return res.status(200).json({ sucess: 'Usuário criado com sucesso' });
	}
}
);
