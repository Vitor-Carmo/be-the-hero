import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg' //Logo

import { Link, useHistory } from 'react-router-dom'; // link para não recarregar toda a pagina
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'; // importando a api


export default function Register(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };


        
        try{
        
            // pegando a resposta
            const response = await api.post('ongs', data);

            // mostrar para o usuário o id
            alert(`Seu ID de acesso: ${response.data.id}`);

            history.push('/'); //levar o usuario de volta para a raiz

        } catch(err){
            alert('Erro no cadastro, tente novamente.')
        }
        
   

    }

    return(
        <div className="register-container">

            <div className="content">
                <section>
                    <img src={logoImg} alt="Be the Hero"/>
                    <h1>Cadastro</h1>
                    <p>
                        Faça seu cadastro, entre na plataforma 
                        e ajude pessoas a encontrarem os casos 
                        da sua ONG.
                    </p>
                        

                    <Link  className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para o logon
                    </Link>
                </section>

 
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input 
                        type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input 
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />

                        <input 
                            placeholder="UF" 
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            style={{width: 80, }}
                        />

                    </div>
                    
                    <button className="button" type="submit">Cadastrar</button>


                </form>
            </div>

        </div>
    );
}