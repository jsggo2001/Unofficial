import styles from './Pagination.module.css'

export default function Pagination({totalPages, paginate, currPage, Pagechange}) {
  const pageNumbers = []
  console.log(totalPages, currPage)

  const paginationLength = totalPages % 10
  const paginationWidth = 100 + 40 * paginationLength

  for (let i=1; i<=totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className={styles.paginationContainer} style={{ '--width': `${paginationWidth}px` }}>
      <div>이쪽</div>
      <div className={styles.paginationNumsContainer}>
        {pageNumbers.map(num => 
          <div className={num-1==currPage?styles.paginationNumBoxcurr:styles.paginationNumBox} 
          onClick={() => {
            paginate(num-1);
            if (Pagechange) {
              Pagechange();}}}
          key={num}>
            <a className={num-1==currPage?styles.paginationNumcurr:styles.paginationNum}  >{num}</a>
          </div>  
        )}
        </div>
      <div>저쪽</div>
    </nav>
  )
}