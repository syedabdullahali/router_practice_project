import {Fragment,useEffect} from 'react'
import {useParams,Route,Routes,Outlet, Link}from 'react-router-dom'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from '../components/hook/use-http'
import { getSingleQuote } from '../components/lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'


function QuoteDetails(){
    const {sendRequest,status,data:loadedQuotes,error} = useHttp(getSingleQuote,true)

    const {quoteId}= useParams()
    
    useEffect(()=>{
    sendRequest(quoteId);
    },[sendRequest,quoteId]);

    if(status==='pending'){
        return(
          <div className='centerd'>
            <LoadingSpinner/>  
          </div>
        )
      }
      if(error){
        return <p className='centered focused'>{error}</p>
    }

    if(!loadedQuotes){
        
        return <p>No quote found!</p>

    }






return <Fragment>
<HighlightedQuote text={loadedQuotes?.text} author={loadedQuotes?.author} />
<div className='centerd'>
{`/quotes/${quoteId}`===window.location.pathname &&
<Link className='btn--flat' to={`/quotes/${quoteId}/comments`}>Load Comments</Link>}
</div>
<Outlet/>
</Fragment>

}

export default QuoteDetails