import React, { Suspense } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import NewQuote from './Page/NewQuote';
import Comments from './components/comments/Comments'
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

const NewQuote = React.lazy(() => import('./Page/NewQuote'))
const QuoteDetails = React.lazy(() => import('./Page/QuoteDetails'))
const NotFound = React.lazy(() => import('./Page/NotFound'))
const AllQuotes = React.lazy(() => import('./Page/AllQuotes'))


// we are domloding this code only when it's need it but  Problem is tHat This 
// Downlosd Can take cuple of second  while dowloding this code react is not able 
// to contnue we can't load this component yet untill the downloaded THt's weneet ddifned Fall back ui
// som FallBack Contain which can be ashown  it this download takes bit longer 
// for this we import Suspense component  a specal component provided by react library it self 
// we need to wrap around the code where we use react lazy 
// and then on thta suspence component we need to set fall back  prop it want's some jsx code as value 
// which is shown a fall back 

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div className='centerd'>
          <LoadingSpinner />
        </div>}>
          <Routes>
            <Route path='/' element={<AllQuotes />}></Route>
            <Route path='/quotes' element={<AllQuotes />}></Route>
            <Route path='/quotes/:quoteId/' element={<QuoteDetails />} >
              <Route path={'comments'} element={<Comments />}></Route>

            </Route>
            <Route path='/new-quote' element={<NewQuote />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
