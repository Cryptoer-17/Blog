import updateObject from '../../utility/updateObject';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articoli: [],
    loading:false,
    esitoCaricamento:"",
    cerca: "",
    risultatiRicerca:[]
}



const postArticoloStart = ( state ) => {
    return updateObject( state, { loading:true } );
};

const postArticoloFail = ( state) => {
    return updateObject( state, {  loading:false , esitoCaricamento: "Errore nel caricamento del post."} );
};

const postArticoloSuccess = ( state, action ) => {
     let arrayArt = [...state.articoli];
     arrayArt.push(action.articolo);
    return updateObject( state, { loading: false, articoli: arrayArt, esitoCaricamento: "Il post è stato caricato con successo." } );
};




const ricercaArticoli = (state,action) =>{
let articoli = [];

if(action.filtro === "")



    return updateObject( state, { risultatiRicerca: articoli} );

}






const reducer = (state = initialState, action) =>  {
    switch(action.type){
        case actionTypes.POST_ARTICOLO_START: return postArticoloStart( state, action);
        case actionTypes.POST_ARTICOLO_FAIL: return postArticoloFail( state, action);
        case actionTypes.POST_ARTICOLO_SUCCESS: return postArticoloSuccess( state, action);
        case actionTypes.SET_ARTICOLI : 
        return{
            ...state,
            articoli : action.articoli
        }
        default: return state;
    }
}


export default reducer;
