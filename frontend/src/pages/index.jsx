import styles from '../styles/pages/Home.module.css';
import cx from 'classnames';

export default function Home() {
  return (
    <div className={cx(styles.background, 'pt-5')}>
      <div className="container" style={{height: '100vh'}}>
        <div className="px-auto">
          <div className="col-9">
            <div className="form">
              <h3 className={styles.label}>Preencha seus dados</h3>
              <form action="">
                <div className="form-group">
                  <label className={styles.label} htmlFor="name" required>Nome:</label>
                  <input type="text" id="name" name="name" className="form-control" placeholder="Insira seu nome"/>
                </div>
                <div className="form-group">
                  <label className={styles.label} htmlFor="email" required>Email:</label>
                  <input type="email" id="email" name="email" className="form-control" placeholder="Insira seu email"/>
                </div>
                <div className="form-group text-center">
                  <button className='btn btn-success' id="botao">Responder</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
