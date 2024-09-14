/**
 * Modal de confirmação
 *
 * - Crie um component para o modal de confirmação
 * - Utilize o código abaixo como base
 * - O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * - O título deve ser "Confirmação"
 * - O conteudo deve ser dinâmico
 */

import { useState } from 'react';
import Head from 'next/head';
import { ModalConfirmacao } from '@/components/ModalConfirmacao';
import styles from '@/styles/modal.module.css';


export default function Home() {
	const [modalOpen, setModalIsOpen] = useState(false);

	function modalClose() {
		setModalIsOpen(false);
	}

	const randomInfo = function () {

		const infos = [
			'O E-mail foi deletado com sucesso',
			'O Telefone foi deletado com sucesso',
			'A Conta foi deletada com sucesso',
			'O arquivo foi removido da pasta',
			'Os dados foram atualizados corretamente',
			'A transação foi concluída',
			'O pagamento foi cancelado',
			'A senha foi alterada com sucesso',
			'O usuário foi removido do sistema',
			'O produto foi excluído do carrinho',
			'A assinatura foi cancelada',
			'As permissões foram atualizadas',
			'O evento foi removido da agenda',
			'A configuração foi salva com sucesso',
			'O documento foi enviado para a lixeira',
			'A reserva foi cancelada',
			'O item foi removido da lista de desejos',
			'O endereço foi atualizado corretamente',
			'O contato foi excluído do catálogo',
			'A notificação foi apagada'
		];

		const index = Math.floor(Math.random() * infos.length);

		return infos[index];
	}
	
return (
	<>
		<main className={styles.container}>
			<button type="button" onClick={() => setModalIsOpen(true)}>
				Abrir modal de confirmação
			</button>
		</main>

		<ModalConfirmacao
			title='Confirmação'
			info={randomInfo}
			isOpen={modalOpen}
			onClose={modalClose}
		/>
	</>
);
}
