import { Fragment } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuots = (quotes,ascending)=>{

 return quotes.sort((quoteA,quoteB)=>{

  if(ascending){
    return quoteA.id> quoteB.id ?1:-1
  }else{
    return quoteA.id<quoteB.id ?1:-1

  }
 })
  
}

const QuoteList = (props) => {
  const changePath = useNavigate()
  const location = useLocation()

const querryParams =   new URLSearchParams(location.search)

const isSortingAscending = querryParams.get('sort') ==='asc'

const sortedQuotes =sortQuots(props.quotes,isSortingAscending)


const changeSortingHandler =()=>{
     changePath('?sort='+(isSortingAscending?'desc':'asc'))
}

  return (
    <Fragment>
       <div className={classes.sorting}>
            <button onClick={changeSortingHandler}>Sort {isSortingAscending?'Desending':'Ascending'}</button>
       </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
