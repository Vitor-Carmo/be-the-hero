import React, { useEffect, useState }from 'react';

import './styles.css';

import logoImg from '../../assets/logo.svg' //Logo

import { Link, useHistory} from 'react-router-dom'; // link para não recarregar toda a pagina

import { FiPower, FiTrash2 } from 'react-icons/fi'; //icone

import api from '../../services/api';



export default function Profile(){

    const ongId = localStorage.getItem('ongId'); //pegando o nome da ong salva no storage
    const ongName = localStorage.getItem('ongName'); //pegando o nome da ong salva no storage

    const [incidents, setIncidentes] = useState([]);

    const history = useHistory();


    useEffect(() => {
        api.get('profile', {
            
            //verificando de quem é o profile
            headers:{

                Authorization: ongId
            }
            
        }).then(response =>{
            setIncidentes(response.data)
        })

    }, [ongId]);

    async function handleDeleteIncident(id){
        try{

            await api.delete(`incidents/${id}`,{
                headers: {
                    Authorization: ongId
                }
            });

            setIncidentes(incidents.filter(incident => incident.id !== id))
        }catch(err){
            alert('Erro ao deletar caso, tente novamente.');
        }


    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');

    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem Vinda, {ongName}</span>


                <Link  className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower  size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (

                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                    
                        <strong>DESCRIÇÃO</strong>
                        <p>{incident.description}</p>
                    
                        <strong>Valor</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                    

                        <button  onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>

                    </li>  
                ))}            

            </ul>


        </div>
    );
}