/**
 * Formulário
 *
 * - Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * - Deve ser implementado utilizando a lib react-hook-form
 * - O formulário deve ter os seguintes campos: nome, e-mail
 * - Os dois campos são obrigatórios e precisam de validação
 * - Ao dar 'submit', deve ser feito uma request para /api/users/create
 * - Lide com os possíveis erros
 */

import styles from '@/styles/formulario.module.css';
import { useState } from 'react';
import { IToastMessage } from '@/types/toast-message';
import { ToastMessage } from '@/components/ToastMessage';
import { faker } from '@faker-js/faker/locale/pt_BR';

export default function Form() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [toasts, setToasts] = useState<IToastMessage[]>([]);

	const messageToast = (message: string, type: 'success' | 'error', duration = 3000) => {
		const newToast: IToastMessage = { id: faker.string.uuid(), message, type, duration };
		setToasts((prevToasts) => [...prevToasts, newToast]);

		setTimeout(() => {
			setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id));
		}, duration);
	};


	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		try {
			const response = await fetch('/api/users/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, email }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error);
			}

			const data = await response.json();
			messageToast('Usuário criado com sucesso!', 'success');

			setName('');
			setEmail('');

		} catch (error) {
			if (error instanceof Error) {
				messageToast(`Erro: ${error.message}`, 'error');
			} else {
				messageToast('Ocorreu um erro inesperado.', 'error');
			}
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="email"
						placeholder="E-mail"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>

					<button type="submit" data-type="confirm">
						Enviar
					</button>
				</form>
				
				<div className={styles.toastContainer}>
					{toasts.map((toast) => (
						<ToastMessage key={toast.id} content={toast} />
					))}
				</div>
			</div>
		</div>
	);
}
