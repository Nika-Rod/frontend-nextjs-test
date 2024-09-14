/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * - Você deve transformar essa página em uma página estática
 * - A página deve ser gerada no momento da build
 * - A página deve ser atualizada a cada 1 minuto
 */

import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';
import type { GetStaticProps, NextPage } from "next";

interface Cidades {
	list: ICity[]
}
const Lista: NextPage<Cidades> = ({ list }) => {

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de cidades</h2>

				<div data-list-container>
					{list.map((city) => (
						<div data-list-item key={city.id}>
							{city.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export const getStaticProps: GetStaticProps<Cidades> = async () => {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';
	const response = await fetch(`${baseUrl}/api/cities/10`);
	const list = (await response.json()) as ICity[];

	return {
		props: { list }, revalidate: 60
	};
};

export default Lista;