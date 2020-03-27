import React, { useEffect, useState }from 'react';

//flatlist = > fazer a rolagem

import { View, FlatList , Image, Text, TouchableOpacity } from 'react-native';

//iconizinho
import { Feather } from '@expo/vector-icons';

//logo 
import logoImg from '../assets/logo.png';

// importando estilo
import styles from './styles';


//navegar para outra page
import { useNavigation } from '@react-navigation/native';

//importando a api 
import api from '../../services/api';


export default function Incidents(){

    const [ incidents, setIncidents ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ page, setPage ] = useState(1);
    const [ loading, setLoading ] = useState(false);



    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident }); //para onde vai navegar 
    }

    async function loadIncidents(){

        if(loading){
            return;
        };

        //se já estiver tudo carregado
        if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);

        const response = await api.get('/incidents',{
            params: { page }
        });


        /*copiando todos os valores que já tem nos incidents
         * copiar todos os valores que vem no reponse data
        */
        setIncidents([...incidents, ...response.data]); //dados dos casos
        
        setTotal(response.headers['x-total-count']); //total de casos 
        
        setPage(page + 1); //pular pra próxima paágina
        
        setLoading(false);
    }


    useEffect(() => {

        loadIncidents();

    }, []);

    return(
        <View style = {styles.container}>
            
            <View style ={styles.header}>

                <Image source={logoImg}/> 
                
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> { total } casos. </Text>
                </Text>

            </View>



            <Text style={styles.title}> Bem-Vindo! </Text>
            <Text style={styles.description}> Escolha um dos casos abaixo e salve o dia.</Text>
            
            

            <FlatList
                style={styles.incidentList} 
                data={ incidents }
                showsVerticalScrollIndicator = { false }
                onEndReached = { loadIncidents }
                onEndReachedThreshold = { 0.2 } // quantos % ele ta no final da lista
                keyExtractor = { incident => String(incident.id) }
                renderItem ={ ( { item: incident } ) => (
                    <View style={styles.incident}>

                        <Text style = {styles.IncidentPropery}> ONG: </Text>
                        <Text style = {styles.IncidentValue}> { incident.name } </Text>


                        <Text style = {styles.IncidentPropery}>CASO:</Text>
                        <Text style = {styles.IncidentValue}>{ incident.title }</Text>


                        <Text style = {styles.IncidentPropery}>VALOR:</Text>
                        
                        <Text style = {styles.IncidentValue}> 
                            { Intl.NumberFormat('pt-BR', 
                                {
                                    style: 'currency', 
                                    currency: 'BRL' 
                                }).format(incident.value)
                            } 
                        </Text>

                        
                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={ () => navigateToDetail(incident) }
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>

                            <Feather name="arrow-right" size={ 16 } color="#E02041"/>
                        </TouchableOpacity>

                </View>
                )}
            />



        </View>

    );
}

