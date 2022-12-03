import { useEffect } from 'react';
import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../components/hook/use-http';
import { addQuote } from '../components/lib/api';
import { useNavigate } from "react-router-dom";


function NewQuote(){
const {sendRequest,status} = useHttp(addQuote)
 const History =  useNavigate();
 
 useEffect(()=>{
  if(status ==='completed'){
    History('/quotes')
  }
 },[status,History])

  const addQuoteHandler = (quoteData)=>{
       sendRequest(quoteData)
  }

return <QuoteForm isLoading={status==='pending'} onAddQuote={addQuoteHandler}/>
}

export default NewQuote