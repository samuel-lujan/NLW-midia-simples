import React from 'react';
import styles from '../../styles/pages/Admin.module.css'
import cx from 'classnames';

export default function Admin(){
    return (
        <div className="container d-flex align-items-center justify-content-center h-100">
            <div className={cx(styles.painel, 'd-flex align-items-center w-100')}>
                <div className="d-flex justify-content-around w-100">
                    <button type="button" className="btn btn-primary btn-lg ">
                        Cadastro de Perguntas
                    </button>
                    <button type="button" className="btn btn-primary btn-lg">
                        Botão Grande
                        </button>
                </div>
            </div>
        </div>
    )
}