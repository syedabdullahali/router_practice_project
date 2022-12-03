import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentList from './CommentsList'
import useHttp from '../hook/use-http';
import {getAllComments} from '../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
    const params = useParams()
    const {quoteId}= params

    const {sendRequest,status,data:loadedComments}=    useHttp(getAllComments)

    useEffect(()=>{
     sendRequest(quoteId)
    },[quoteId,sendRequest])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  
  const addedCommentHandler =useCallback(()=>{
    sendRequest(quoteId)

  },[sendRequest,quoteId])

  let comments;

  if(status==='pending'){
    comments = <div className='centerd'>
    <LoadingSpinner/>
    </div>
  }

  if (status==='completed' && loadedComments && loadedComments.length>0){
    comments = <CommentList comments={loadedComments}/>
  }

  if(status==='completed' && (!loadedComments || loadedComments.length ===0)){
    comments = <p className='centerd'>No comments were added yet!</p>
  } 
 
  
   
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler} />}
      {comments}
    </section>
  );
};

export default Comments;
