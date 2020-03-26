import React, { useState } from 'react';

import './styles.css'; //importando o css 

import heroesImg from '../../assets/heroes.png'; //imagem dos heroes
import logoImg from '../../assets/logo.svg' //Logo

import { Link, useHistory } from 'react-router-dom'; // link para não recarregar toda a pagina

import { FiLogIn } from 'react-icons/fi'; //icone

import api from '../../services/api';



export default function Logon(){
    
    const [id, setId] = useState();
    const history = useHistory();

    async function handleLogin(e){
        
        e.preventDefault(); //evitar carregamento
        
        
        try{

            const reponse = await api.post('sessions', { id });

            localStorage.setItem('ongId', id); // salvar no storage do navegador
            localStorage.setItem('ongName', reponse.data.name); 

            history.push('/profile');

        }catch(err){

            alert('Falha no login tente novamente.');

        }

    }


    return (
        <div className="logon-container">

            <section className="form">
                <img src={logoImg} alt="Be the Hero"/>

                <form onSubmit={handleLogin}>
                    
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange = {e => setId(e.target.value)}
                    />
                    <button className="button"type="submit">Entrar</button>

                    
                    <Link  className="back-link" to="/register">
                    <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>

                </form>

            </section>

            <img src={heroesImg} alt="Heroes"/>

        </div>

        

    );
}