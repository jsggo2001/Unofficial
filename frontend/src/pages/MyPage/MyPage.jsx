import styles from "./MyPage.module.css";

import TopSpace from "../../components/TopSpace/TopSpace";
import UnderSpace from "../../components/UnderSpace/UnderSpace";

import { FiHome } from "@react-icons/all-files/fi/FiHome";
import { FiActivity } from "@react-icons/all-files/fi/FiActivity";
import { RiAdvertisementLine } from "@react-icons/all-files/ri/RiAdvertisementLine";
import { BiLogOut } from "@react-icons/all-files/bi/BiLogOut";

import { Outlet, Link, useLocation } from "react-router-dom";

export default function MyPage() {
  const location = useLocation();
  const path = location.pathname;

  // 현재 경로에서 'activity'나 'advertisement' 문자열이 있는지 확인
  const isActiveActivity = path.includes("activity");
  const isActiveAdvertisement = path.includes("advertisement");

  let activeTab = isActiveActivity
    ? "활동"
    : isActiveAdvertisement
    ? "광고"
    : "정보"; // 기본 탭 설정

  return (
    <>
      <TopSpace />
      <div className={styles.mypageContainer}>
        <div className={styles.mypageNavContainer}>
          <nav>
            <div className={styles.navtitleContainer}>
              <h4>마이페이지</h4>
            </div>
            <div className={styles.navtopContainer}>
              <div>
                <div className={styles.navnameContainer}>
                  <FiHome
                    className={styles.mypagenavIcon}
                    style={activeTab === "정보" ? { color: "#034BB9 " } : null}
                  />
                  <Link
                    to="/user"
                    className={styles.mypagenavtab}
                    style={activeTab === "정보" ? { color: "#034BB9 " } : null}
                  >
                    비밀번호 변경
                  </Link>
                </div>
                <div className={styles.navnameContainer}>
                  <FiActivity
                    className={styles.mypagenavIcon}
                    style={activeTab === "활동" ? { color: "#034BB9" } : null}
                  />
                  <Link
                    to="activity"
                    className={styles.mypagenavtab}
                    style={activeTab === "활동" ? { color: "#034BB9" } : null}
                  >
                    내 활동 모아보기
                  </Link>
                </div>
                <div className={styles.navnameContainer}>
                  <RiAdvertisementLine
                    className={styles.mypagenavIcon}
                    style={activeTab === "광고" ? { color: "#034BB9" } : null}
                  />
                  <Link
                    to="advertisement"
                    className={styles.mypagenavtab}
                    style={activeTab === "광고" ? { color: "#034BB9" } : null}
                  >
                    광고 및 마일리지 관리
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          <div className={styles.navlogoutContainer}>
            <BiLogOut />
            <button className={styles.logoutButton}>Logout</button>
          </div>
        </div>
        <div className={styles.mypageContentContainer}>
          <Outlet />
        </div>
      </div>
      <UnderSpace />
    </>
  );
}
