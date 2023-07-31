import styles from './BoardsView.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PostsView from '../../../components/PostView/PostView'

export default function BoardsView( ){
  const [ posts, setPosts ] = useState([]);
  let { boardTitle } = useParams();
  if (! boardTitle ) {
    boardTitle = '자유게시판'
  }
  const navigate = useNavigate();
  const URL = useSelector(state => state.URL.API_URL)

  useEffect(() => {

    axios({
      method: "get",
      url: `${URL}api/v1/articles`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch((err) => console.log(err))
    return () => {  
      console.log('unmounted')
     }}, []);

  if (posts) {
    return(
      <div>
        {posts.map((post, index) => (
          <PostsView key={index} boardTitle={boardTitle} post={post}/>
        ))}
      </div>
    );
  } else {
    return(
      <div>
        결과가 없습니다.
      </div>
    )
  }
}
//   return(
//     <div>
//       BoardsView
//       {boardTitle}
//     </div>
//   );
// }