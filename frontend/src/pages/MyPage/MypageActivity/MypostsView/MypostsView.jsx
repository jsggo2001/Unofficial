import styles from './MypostsView.module.css'

import BoardView from '../../../../components/BoardView/BoardView'

export default function MypostsView(){
  const user = 'SSAFY 서울 9기'
  const date = 100

  return(
    <div className={styles.contentContainer}>
      <div className={styles.welcomeContainer}>
        <div/>
        {/* <p>안녕하세요! <span style={{color:'#282828', fontSize:'1.2rem', fontWeight:'600'}}>{ user }</span>님!</p>  */}
      </div>
      <div className={styles.myContentContainer}>
        <div className={styles.mycontentTop}>
          <div className={styles.mycontentTitle}>
            <h2 className={styles.mypostsTitle}>내 게시글 보기</h2>
            <p className={styles.smallTitle}>내가 작성한 게시물을 모아볼 수 있습니다.</p>
          </div>
          <p style={{color:'#282828'}}>가입한지 <span style={{color:'#034BB9', fontSize:'1.2rem', fontWeight:'600'}}>+{ date }일</span></p>
        </div>
        {/* <div className={styles.temp} /> */}
        <BoardView />
      </div>
    </div>
  );
}