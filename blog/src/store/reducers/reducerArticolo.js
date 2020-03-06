import updateObject from '../../utility/updateObject';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articoli: [],
    loading:false,
    esitoCaricamento:"",
    cerca: null,
    risultatiRicerca:[],
    error : null
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


const SetArticoliStart = (state, action) =>{
    return updateObject(state , {error:null, loading : true})

}

const setArticoliSuccess = (state, action ) =>{
    return updateObject(state , {articoli : action.articoli, error:null, loading : false})
}

const setArticoliFail = (state , action) =>{
    return updateObject( state, {error : action.error, loading: false})
}




const startRicerca = (state,action) => {
    return updateObject( state, { cerca: action.cerca} );
}


const ricercaArticoli = (state,action) =>{
let articoli = [];

    if(action.filtro === "tag"){
        articoli= state.articoli.filter(art => {return  art.articolo.tags ?
             art.articolo.tags.indexOf(state.cerca) >= 0
             : null
            }
        );
    }

    if(action.filtro === "categoria"){
        articoli= state.articoli.filter(art => art.articolo.categoria === state.cerca);
    }

    return updateObject( state, { risultatiRicerca: articoli} );

}






const reducer = (state = initialState, action) =>  {
    switch(action.type){
        case actionTypes.POST_ARTICOLO_START: return postArticoloStart( state, action);
        case actionTypes.POST_ARTICOLO_FAIL: return postArticoloFail( state, action);
        case actionTypes.POST_ARTICOLO_SUCCESS: return postArticoloSuccess( state, action);
        case actionTypes.SET_ARTICOLI_SUCCESS : return setArticoliSuccess(state,action);
        case actionTypes.SET_ARTICOLI_START : return SetArticoliStart(state,action);
        case actionTypes.SET_ARTICOLI_FAIL : return setArticoliFail(state, action);
        case actionTypes.RICERCA_ARTICOLI : return ricercaArticoli(state,action);
        case actionTypes.START_RICERCA : return startRicerca(state,action);
        default: return state;
    }
}


export default reducer;
