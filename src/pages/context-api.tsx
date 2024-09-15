/**
 * Context Api
 *
 * - Criar um contexto para exibir mensagens de sucesso e erro
 * - Criar um componente para exibir as mensagens
 * - Criar um hook para disparar e consumir as mensagens
 * - Disparar as mensagens a partir dos botões abaixo
 */

import styles from '@/styles/context-api.module.css';
import { IToastMessage } from '@/types/toast-message';
import { ToastMessage } from '@/components/ToastMessage';
import { useState } from 'react';

export default function ContextApi() {

	const [menssagens, setMenssagens] = useState<Array<IToastMessage>>([]);

	const handleButtonClick = (mensagemAlerta: string, tipoAlerta: 'success' | 'error') => {
		const menssagemDisparada: IToastMessage = {
			id: Math.random().toString(), 
			message: mensagemAlerta,
			type: tipoAlerta,
		};

		const duplicado = menssagens.some(msg => msg.message === mensagemAlerta && msg.type === tipoAlerta);

		if (!duplicado) {
			const menssagemAtual = [...menssagens];
			menssagemAtual.push(menssagemDisparada);
			setMenssagens(menssagemAtual);
	
			setTimeout(() => {
				const atualizacao = menssagemAtual.filter(msg => msg.id !== menssagemDisparada.id);
				setMenssagens(atualizacao);
			}, 5000)
		}
	}

	return (
		<>
			<div className={styles.container}>
				<button type="button" onClick={() => handleButtonClick('Menssagem de sucesso', 'success')}>
					Disparar mensagem de sucesso
				</button>
				<button type="button" onClick={() => handleButtonClick('Menssagem de erro', 'error')}>
					Disparar mensagem de erro
				</button>
			</div>

			<div className={styles['toast-container']}>
				{menssagens.map((msg) => (
					<ToastMessage key={msg.id} content={msg} />
				))}
			</div>
		</>
	);
}
