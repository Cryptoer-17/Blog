import React, {Component} from 'react';
import classes from './Homepage.module.css';
import Anteprimaarticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {connect} from 'react-redux';


class Homepage extends Component{





render(){

   let articoli = <Spinner/>; 

   
  
  
  const newarticolo = [ ...this.props.arti];


 const articolo = newarticolo.map((art,index) =>{
   return (<Anteprimaarticolo 
      id={art.key} 
      autore={art.articolo.autore}
      categoria = {art.articolo.categoria}
      descrizione = {art.articolo.descrizione}
      img = {art.articolo.img}
      like = {art.articolo.like}
      sottotitolo = {art.articolo.sottotitolo}
      testo = {art.articolo.testo}
      titolo = {art.articolo.titolo}
      key={art.key}/>);
   })
  
  

return(

   <div className={classes.Homepage}>

      <h1 className={classes.Titolo}>Blog</h1>


      <div className={classes.ContainerArticoli} >
      {this.props.arti ? articolo : null}
      </div>

      <button title = "Torna in cima" className = {classes.TornaSuButton}  onClick = {() => document.documentElement.scrollTop = 0}><i className="material-icons">arrow_upward</i> </button>
</div>

);


}

}


const mapStateToProps = state =>{
  
   return{
      arti : state.articolo.articoli
   }
}



export default connect(mapStateToProps)(Homepage);