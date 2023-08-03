import React from "react";
import styles from "./SearchView.module.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { FiSearch } from "@react-icons/all-files/fi/FiSearch";
import { IoIosArrowBack } from "@react-icons/all-files/io/IoIosArrowBack";

import TopSpace from "../../components/TopSpace/TopSpace";
import SearchContent from "../../components/SearchContent/SearchContent";
import AdHorizontal from "../../components/AdHorizontal/AdHorizontal";

import customAxios from "../../util/customAxios";

export default function SearchView() {
  const { keyword } = useParams();
  const { boardTitle } = useParams();
  const [ keywordAll, setKeywordAll ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    customAxios({
      method: "get",
      // url: `/api/articles/search?keyword=${keyword}&boardId=1`,
      url: `/api/articles/search?keyword=${keyword}&boardId=0`,
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTEwNjc3MzksInN1YiI6ImFjY2Vzcy10b2tlbiIsImh0dHBzOi8vbG9jYWxob3N0OjgwODAiOnRydWUsInVzZXJfaWQiOjE0LCJyb2xlIjoiUk9MRV9BRE1JTiJ9.Z_SHpW9_1WQbswqnR4ADZqGNAphQjbEh88uBt2W_BVzKndwCQ4IUkwy7qIp-EuiOhXCWKB2nbR_O71RehedxXw`
      }
    })
    .then((res) => 
      console.log(res)
    )
    .catch((err) => console.log(err));
      return () => {  
        console.log('unmounted')}
    }, []);

  return (
    <div>
      <TopSpace />

      <form className={styles.searchboxall}>
        <input
          className={styles.search}
          id={styles.all}
          type="text"
          placeholder="찾고싶은 게시글의 제목 또는 내용의 키워드를 검색"
          onChange={(e) => {
            setKeywordAll(e.target.value);
          }}
        />
        <button
          className={styles.searchbutton}
          onClick={() => navigate(`/boards/search/${keywordAll}`)}
        >
          <FiSearch />
        </button>
      </form>

      <div className={styles.searchcontentContainer}>
        <AdHorizontal />

        <div className={styles.searchUpheader}>
          <div>
            <span className={styles.boardTitle}>전체게시판</span>의{" "}
            <span className={styles.searchKeyword}>'{keyword}'</span> 검색 결과
          </div>
          <button
            className={styles.grayoutbutton}
            onClick={() => navigate("/boards/자유게시판")}
          >
            <IoIosArrowBack />
            게시판으로 돌아가기
          </button>
        </div>

        <div className={styles.searchcontentBox}>
          <SearchContent />
        </div>
      </div>
    </div>
  );
}
