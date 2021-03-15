import styles from '../styles/pages/Home.module.css';
import cx from 'classnames';
import { useState } from 'react';
import api from '../services/api'
import axios from 'axios';

export default function Home() {
  const [name, setName]  = useState('');
  const [email, setEmail]  = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    try{
      const {data} = await api.post('/users', {
        name,
        email
      });
      
      alert('Cadastrado com sucesso');
    } catch (error){
      console.log(error);
    }

  }
  return (
    <div className={cx(styles.background)}>
      <div className="container d-flex align-content-center" style={{height: '100vh'}}>
        <div className="d-flex align-items-center">
          <div className={cx('col-9', styles.centerForm)}>
            <div className={cx(styles.form)}>
              <h3 className={styles.label}>Preencha seus dados</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className={styles.label} htmlFor="name">Nome:</label>
                  <input type="text" id="name" name="name" onChange={(e)=> setName(e.target.value)} value={name} className="form-control" placeholder="Insira seu nome" required/>
                </div>
                <div className="form-group">
                  <label className={styles.label} htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" placeholder="Insira seu email" required/>
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
