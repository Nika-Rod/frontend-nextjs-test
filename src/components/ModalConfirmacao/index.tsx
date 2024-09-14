import styles from '../Modal/style.module.css'

type ModalConfirmacaoProps = {
	isOpen: boolean;
    title: string;
    info: () => string;
	onClose?: (type: 'click' | 'esc', target: EventTarget) => void;
    footer?: {
		hidden?: boolean;
		confirmText?: string;
	};
};

export const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({ isOpen, title, info, ...props }) => {
	function handleCloseClick(e: React.MouseEvent) {
		props.onClose?.('click', e.target);
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.key === 'Escape') props.onClose?.('esc', e.target);
	}

	if (!isOpen) return null;

	return (
		<div data-modal-wrapper className={styles.wrapper} tabIndex={0} onKeyDown={handleKeyDown}>
			<div data-modal-container>
				<header data-modal-header>
					<h2>{title}</h2>

					<button data-modal-close onClick={handleCloseClick}>
						X
					</button>
				</header>

                <div data-modal-content>
                    <p>{info()}</p>
                </div>


                {!props.footer?.hidden && (
					<div data-modal-footer>
						<button data-modal-confirm onClick={handleCloseClick} data-type="confirm">
							{props.footer?.confirmText ?? 'Ok'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
