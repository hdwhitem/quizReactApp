import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios';

export const ContentContext = createContext()

export const ContentContextProvider = props => {

    const [posts, setPost]= useState([]);
  
    useEffect(() => {
        axios.get('http://localhost:3300/post')
        .then(res => {
         setPost(res.data);
         console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    },[])

    const filterPost = post => {
      setPost(post);
    };
  
  
    return (
      <ContentContext.Provider
        value={{
          posts,
          filterPost
        }}
      >
        {props.children}
      </ContentContext.Provider>
    )
  }