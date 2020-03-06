import React, {Component} from 'react';
import classes from './Anteprimaarticolo.module.css';
import {NavLink} from 'react-router-dom';
import Autore from '../Autore/Autore';
import ActionBar from '../ActionBar/ActionBar';
import Info from '../InfoArticolo/InfoArticolo';


class AnteprimaArticolo extends Component{
   
    render(){

    
    let colore = 'black';  
    let variabile ; 
    const {autore, titolo, sottotitolo,categoria, img,descrizione,clickHeart} = this.props; 


        if(this.props.like){
            colore = 'red';
        }

        variabile = <div>
            {this.props.titolo}
        </div>

        variabile =  <div className={classes.Anteprimaarticolo}>
           
<Info autore = {autore} categoria = {categoria} data = {new Date().toLocaleDateString()} tempoLettura = "2 min" />

           <div className={classes.Autore}> <Autore name ={autore}  /> </div>
           <NavLink to={"/articolo/" + this.props.id} style={{
                textDecoration : 'none',
                color : 'black'
            }}>
            <div className={classes.Titolo}>
            <p>{titolo}</p>
            </div>
            <div className={classes.Sottotitolo}>
       
            <p>{sottotitolo} </p> 
            </div>
            <div className={classes.Imgdiv}>
                <img className={classes.Img} src={img} alt="" />
            </div>
            <div className={classes.Testo}>
            <p>{descrizione}</p>
            </div></NavLink>
           
         <ActionBar className = {classes.Actions} color={colore} onClick={clickHeart}/>   

        </div>
    
  

    return(
        <div>
            {variabile}
        </div>
    );
}
} 

export default AnteprimaArticolo;

