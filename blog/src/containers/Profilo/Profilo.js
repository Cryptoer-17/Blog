import React, {Component} from 'react';
import classes from './Profilo.module.css';
import {connect } from 'react-redux';
import AnteprimaArticolo from '../../Components/AnteprimaArticolo/AnteprimaArticolo';
import { MdEmail } from 'react-icons/md';
import { IoIosSend } from 'react-icons/io';
import * as actions from '../../store/actions/index';
import Input from '../../Components/UI/Input/Input';
import Spinner from '../../Components/UI/Spinner/Spinner';
import checkValidity from '../../utility/validation';


class Profilo extends Component{
    state={
        anteprimaImg:null,
        presentazione:null,
        modificaDati:null,
        img:null,
        formIsValid: false,
        profileForm:{
                nome:{
                    elementType:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Tuo nome'
                    },
                    value: '',
                    valid: true,
                    touched: false
                },
                cognome:{
                    elementType:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Tuo cognome'
                    },
                    value: '',
                    valid: true,
                    touched: false
                },
                dataNascita: {
                    elementType:'input',
                    elementConfig:{
                        type: 'date'
                    },
                    validation:{
                        isDate:true
                    },
                    value: '',
                    valid:false,
                    touched: false
                },
                sesso: {
                    elementType:'radio',
                    elementConfig:{
                        type: 'radio',
                        options:[
                            {value:'f', displayValue:'F'},
                            {value:'m', displayValue:'M'}
                        ]
                    },
                    value: '',
                    valid: true,
                    touched: false

                },
                numeroTelefono:{
                    elementType:'input',
                    elementConfig:{
                        type: 'text',
                        placeholder: 'Tuo numero  telefono'
                    },
                    value: '',
                    validation:{
                        minLength:11,
                        maxLength:11
                    },
                    valid: true,
                    touched: false
                },
                nazionalita:{
                    elementType:'select',
                    elementConfig:{
                       options: [
                           {value:'italia', displayValue:'Italia'},
                           {value:'grecia', displayValue:'Grecia'},
                           {value: 'spagna', displayValue:'Spagna'},
                           {value: 'inghilterra', displayValue:'Inghilterra'}
                        ]
                    },
                    value: 'italia',
                    valid: true

                },
            }
    }

componentDidMount(){

}

HandlerChange(event){
    this.setState({nome: event.target.value})
}

handlerClickPresentazione(){
    this.setState({presentazione : false})
}


orderHandler= ()=>{
    const formData = {};
    for(let formElementIdentifier in this.state.profileForm){
        formData[formElementIdentifier] = this.state.profileForm[formElementIdentifier].value;
    }
    const profile={
        nome: formData.nome,
        cognome:formData.cognome,
        dataNascita:formData.dataNascita.trim(),
        sesso: formData.sesso.trim(),
        numeroTelefono:formData.numeroTelefono.trim(),
        nazionalità:formData.nazionalita.trim(),
        img:this.state.img.trim(),
        userId:localStorage.getItem('userId').trim()
    }
    
    this.props.onSendData(profile);

    //props action send data
}

handlerModificaDati(){
    this.setState({modificaDati: !this.state.modificaDati})

}

inputChangedHandler = (event, inputIdentifier)=>{


const updatedprofileForm = {
    ...this.state.profileForm
}
  const updatedFormElement= {
    ...updatedprofileForm[inputIdentifier]
}

updatedFormElement.value = event.target.value;

        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedprofileForm[inputIdentifier] = updatedFormElement;
        console.log(updatedprofileForm[inputIdentifier]);
        let formIsValid = true;
        for (let inputIdentifier in updatedprofileForm) {
            formIsValid = updatedprofileForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({profileForm: updatedprofileForm, formIsValid: formIsValid});

}

convertFile = (e)=>  { 
    let reader = new FileReader();
    reader.readAsDataURL(e);
    reader.onloadend = () => {
  
    this.setState({img: reader.result, anteprimaImg: <img className={classes.InputImg} src = {reader.result} alt = "" />})
    console.log(this.state.img);
    }
  };



  checkValidityOfInput = (event, id) =>{

    let newObj = { ...this.state.profileForm[id], value: event.target.value, valid:checkValidity(event.target.value, this.state.profileForm[id].validation), touched:true };
    let newForm = {...this.state.form,  [id]: {...newObj}}
    let formIsValid = true;
    for (let key in newForm) {
        formIsValid = newForm[key].valid && formIsValid;
    }
        this.setState({isFormValid:formIsValid, form: newForm})
    }


render(){

    let {anteprimaImg,presentazione,modificaDati} = this.state;
    let {loading} = this.props;
    let email;
    email = localStorage.getItem('email');

    const personal_article = [...this.props.articoli]

    let presentazioneVisualizzata ;
    let btnInviaInfo=null;
    {presentazione===null? 
        presentazioneVisualizzata= <button className={classes.BtnPresentazione} onClick={()=>this.handlerClickPresentazione()}><i>Aggiungi una breve presentazione</i></button> 
        : presentazione===false && ((presentazioneVisualizzata = <input type="text"></input>) && (btnInviaInfo = <button className={classes.ButtonEmail} >Invia breve presentazione</button>))
    } 




    const formElemetsArray = [];
    for(let key in this.state.profileForm){
        formElemetsArray.push({
            id: key,
             config: this.state.profileForm[key],

        })
    }

    let form = (
        <form>
            {formElemetsArray.map(formElement =>(
                <Input 
                        key={formElement.id}
                        type={formElement.config.elementType} 
                        config={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)}
                        touched = { formElement.config.touched}
                       shouldValidate={formElement.config.validation}
                       valid = {formElement.config.valid}
                       /> 
            ))}
        </form>
    );



    let nome;
    let pageModificaDati =  (<div className={classes.ModificaDati}>
    <h3>MODIFICA I TUOI DATI</h3>
        {form}
        <div className={classes.DivFoto} > 

        <button className = {classes.CaricaImgButton}  onClick = {() => document.getElementById("inputFile").click() }> <i className="material-icons"  style = {{verticalAlign:'middle'}}>photo_camera</i> Carica foto profilo</button>
        
        { anteprimaImg ?  anteprimaImg : null}</div>
        <input  id = "inputFile" type = "file" accept="image/png,image/gif,image/jpeg, image/jpg" onChange={ event =>this.convertFile(event.target.files[0]) } style={{width:'0px'}}/* style = {{display:'none', visibility:'hidden',zIndex:'-200'}}*//>
        <button  className={classes.ButtonSend}  onClick={this.orderHandler} disabled={!this.state.formIsValid} style={{marginTop: '59px'}}><IoIosSend style={{verticalAlign: 'middle',marginRight: '4px'}}/>Invia dati</button>
    </div>);


    let articoliVisualizzati;
    articoliVisualizzati = personal_article.map((art) =>{
        if(art.articolo.userId===localStorage.getItem('userId')){
            return (
                <AnteprimaArticolo 
                id={art.key} 
                autore={art.articolo.autore}
                categoria = {art.articolo.categoria}
                descrizione = {art.articolo.descrizione}
                img = {art.articolo.img}
                like = {art.articolo.like}
                sottotitolo = {art.articolo.sottotitolo}
                testo = {art.articolo.testo}
                titolo = {art.articolo.titolo}
                data = {art.articolo.data}
                minuti = {art.articolo.minuti}
                clickHeart = {() => this.clickHeartHandler(art)}
                key={art.key}/>
            );
        } else return null;
      
   })

   if(loading){
       pageModificaDati= <Spinner/>
   }

    return(
        <div className={classes.Profilo}>
            <div>
            <h1>Profilo Persona</h1>
            </div>
            <div className={classes.Informazioni}>
                <h3>INFORMAZIONI</h3>
                {presentazioneVisualizzata}
                {btnInviaInfo}
            </div>
           
            <div className={classes.DatiPersonali}>  
                <h3>DATI PERSONALI</h3> 
                <div style={{marginBottom:'10px'}}>
                Email : {email}
                </div>
                <div>
                Altri dati coming soon
                <button className={classes.ButtonSend} style={{marginTop:'-6px'}} onClick={() =>this.handlerModificaDati()}><MdEmail style={{verticalAlign: 'middle'}}/> Modifica Dati</button>
                </div>  
                    
                   
            </div>
            {(modificaDati) ? pageModificaDati : null}           
            
            {articoliVisualizzati}
        </div>
    );
}

}


const mapStateToProps = state =>{
    return{
       articoli : state.articolo.articoli,
       loading: state.profilo.loading
    }
 }
 
 
 const mapDispatchToProps = dispatch => {
    return{
    // onGoogleAuth: () => dispatch(actions.googleAuth()),
    // onLogin : (email,password,isSignup,errore) => dispatch(actions.login(email,password,isSignup,errore)),
    // onSetLoginRedirectPath: () => dispatch(actions.setLoginRedirectPath('/'))
        onSendData: (data) => dispatch(actions.sendData(data))
    };
  };


export default connect(mapStateToProps,mapDispatchToProps)(Profilo);