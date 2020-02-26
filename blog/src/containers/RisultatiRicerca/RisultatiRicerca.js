import React, {Component} from 'react';
import classes from './RisultatiRicerca.module.css';

class RisultatiRicerca extends Component{

    state = {
        cerca:"",
        articoli:[
        {
            titolo: "art1",
            categoria: 'test',
            tags:['prova','react']
        },
        {
            titolo: "art2",
            categoria: 'test',
            tags:['ciao','react']
        },
        {
            titolo: "art3",
            categoria: 'prova',
            tags:['ciao','react']
        }
        ],
        classeCat :null,
        classeTag : null,
        risultati:[]
    }


    render(){
       

       const displayCategoryResultsHandler = (cerca) =>{
           let risultatiCat = [];
           risultatiCat= this.state.articoli.filter(art => art.categoria === cerca);
           risultatiCat = risultatiCat.map(r => <li key = {r.titolo}> {r.titolo} </li>);
           if (risultatiCat.length === 0){
               risultatiCat = "Nessun risultato.";
           }
           this.setState({risultati:risultatiCat, classeCat: classes.OpzioneSelezionata,classeTag: null});
        }

       const displayTagResultsHandler = (cerca) =>{
            let risultatiTag = [];
            risultatiTag = this.state.articoli.filter(art =>  art.tags.indexOf(cerca)>= 0);
            risultatiTag = risultatiTag.map(r => <li key = {r.titolo}> {r.titolo} </li>);
            if (risultatiTag.length === 0){
                risultatiTag = "Nessun risultato.";
            }
            this.setState({risultati:risultatiTag,  classeTag: classes.OpzioneSelezionata,classeCat: null}); 
        }


        return(
            <div className = {classes.RisultatiRicerca}>
              <div>
                <input autoFocus className = {classes.InputRicerca} type = "text" placeholder = ""   onChange={( event ) => this.setState( { cerca: event.target.value } )}  />
              </div>

              <div className = {classes.OpzioniRicerca}>
                Filtra per <br/>
                <p className = {this.state.classeCat} onClick = {() =>displayCategoryResultsHandler(this.state.cerca)}>Categoria</p> | <p  className = {this.state.classeTag} onClick = {() =>displayTagResultsHandler(this.state.cerca)}>Tag</p>
                <hr  className = {classes.Divisore} />
              </div>

               <div className = {classes.ContainerRisultati}>
                <ul>
                {this.state.risultati}
                </ul>
               </div>
            </div>

        );
     }
    
}
export default RisultatiRicerca;