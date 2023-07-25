import styles from './Signup.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setEmail, setPassword } from './../../store/signupSlice'


export default function Signup2(){

  let user = useSelector((state)=>state.user)
  // 지역, 기수를 입력하지 않은 상태에서 바로 링크타고 들어오는것 방지
  useEffect(()=> {
    if (!user.gen || !user.local){
      navigate('/signup')
    }
  }, [])

  const [userEmail, setUserEmail] = useState('')
  const [emailValid, setEmailValid] = useState(false)
  const [isDuplicate, setIsDuplicate] = useState(true)
  const [duplicationMent, setDuplicationMent] = useState('')
  const [userPassword1, setUserPassword1] = useState('')
  const [userPassword2, setUserPassword2] = useState('')
  const [passwordMismatch, setPasswordMismatch] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleEmailChange=(event)=>{
    setUserEmail(event.target.value)
  }
  const handleEmailValid=(event)=>{
    const pattern = /^([0-9a-zA-Z_.-]+)@[0-9a-zA-Z_-]+\.[a-zA-Z_-]{2,3}$/
    if (!event.target.value.match(pattern)){
      setEmailValid(false)
      return
    }
    setEmailValid(true)
  }
  const handlePasswordChange1=(event)=>{
    setUserPassword1(event.target.value);
    setPasswordMismatch(userPassword2 !== event.target.value)
  }
  const handlePasswordChange2=(event)=>{
    setUserPassword2(event.target.value);
    setPasswordMismatch(userPassword1 !== event.target.value)
  }
  // 이메일 입력 오류 확인
  const checkEmail=()=>{
    if (!userEmail) {
      alert('이메일을 입력해주세요.')
      return false
    }
    // 
    if (!emailValid){
      alert('올바른 이메일 주소를 입력해주세요.')
      return false
    }
    return true
  }
  // 이메일 중복 확인
  const doubleCheck=()=>{
    if (!checkEmail()) {
      return false
    }
    setDuplicationMent(<p style={{color: 'green'}}>확인 중입니다.</p>)
    
    const serverURL = 'http://unofficial.kr:8080'

    axios
      .post(`${serverURL}/api/verify`, { email: userEmail })
      .then((res)=>{
        console.log(res)
        if (res.status === 200) {
          setDuplicationMent(<p style={{color: 'green'}}>사용 가능한 아이디입니다.</p>)
          setIsDuplicate(false)
        } 
      })
      .catch((err)=>{
        if (err.response.data.message) {
          setDuplicationMent(<p style={{color: 'red'}}>{ err.response.data.message }</p>)
        } else {
          setDuplicationMent(<p style={{color: 'red'}}>오류가 발생했습니다. 잠시후 다시 시도해 주세요.</p>)
        }
        setIsDuplicate(true)
        console.log(err)
      })
  }
  // 비밀번호 입력 오류 확인
  const checkPassword=()=>{
    let pw = userPassword1
    let num = pw.search(/[0-9]/g);
    let eng = pw.search(/[a-z]/ig);
    let spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (pw.length < 8 || pw.length > 20) {
      alert("8자리 ~ 20자리 이내로 입력해주세요.");
      return false
    }
    if (pw.search(/\s/) !== -1) {
      alert("비밀번호는 공백 없이 입력해주세요.");
      return false
    }
    if (num < 0 || eng < 0 || spe < 0  ){
      alert("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
      return false
    }
    if (passwordMismatch) {
      alert('비밀번호가 일치하지 않습니다.')
      return false
    }
    return true
  }
  // 최종 제출 오류 확인
  const handleSubmit=()=>{

    if (isDuplicate){
      alert('이메일을 확인해 주세요.')
      return
    }
    if (!checkPassword()){
      alert('비밀번호를 확인해 주세요.')
      return
    }
    // 입력된 이메일과 비밀번호 정보를 user 객체에 저장
    dispatch(setEmail(userEmail))
    dispatch(setPassword(userPassword2))
    navigate('/signup/complete')
  }

  return(
    <div id={styles.container}>

      <h2>언오피셜 회원가입</h2>
      <p className='my-0'>언오피셜 계정으로 <b>점심식단, 자유게시판</b>등</p>
      <p className='my-0'>다양한 교육생 서비스를 모두 이용하실 수 있습니다.</p>
      <br />
      <h2>등록</h2>
      <p className='mb-3' style={{color:'red'}}>에듀싸피 계정과 동일한 이메일 주소로 가입해주세요.</p>
      
      <div class="mb-1">
        <label for="exampleInputEmail" className="form-label">이메일 주소</label>
        <div class="input-group">
          <input type="email" class="form-control" id="exampleInputEmail" onChange={handleEmailChange} onInput={handleEmailValid} />
          <button class="btn btn-outline-secondary" type="button" onClick={doubleCheck}>중복확인</button>
        </div>
        {userEmail && !emailValid && <p style={{color: 'red'}}>올바른 이메일 주소를 입력해주세요.</p>}
        {duplicationMent}
      </div>

      <div class="mb-1">
        <label for="exampleInputPassword1" className="form-label">비밀번호</label>
        <input type="password" class="form-control" id="exampleInputPassword1" onChange={handlePasswordChange1} />
      </div>
      <div class="mb-4">
        <label for="exampleInputPassword2" className="form-label">비밀번호 확인</label>
        <input type="password" class="form-control" id="exampleInputPassword2" onChange={handlePasswordChange2} />
        {userPassword1 && userPassword2 && passwordMismatch 
        && <p style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</p>}
      </div>

      <input type="submit" value="다음" onClick={handleSubmit} />
    </div>
  )
}