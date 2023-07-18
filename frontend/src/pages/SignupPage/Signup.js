import React from 'react';
import { useState } from 'react';
import Login from './../../components/Login/Login'
import { Outlet } from 'react-router-dom';

function Signup() {

  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  // 모달창 노출
  const showModal = () => {
      setModalOpen(true);
  }

  return (
    <div className="Singup">
      <Outlet />
      <div>
        <button style={{display:'block', margin:'0 auto'}} onClick={showModal}>로그인</button>
        {modalOpen && <Login setModalOpen={setModalOpen} />}
      </div>
    </div>
  )
}

export default Signup;