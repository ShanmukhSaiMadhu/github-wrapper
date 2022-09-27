import React, {useState} from 'react';
import './App.css';

function App() {

  const [userName, setUserName] = useState('')
  const [resData, setResData] = useState('')

  const handleUsernameInput = (e) => {
    setUserName(e.target.value)
  }
  let gitData
  const handleSubmit = (e) => {
    e.preventDefault()

    fetch('https://api.github.com/users/' + userName)
    .then(res => res.json())
    .then(data => 
      {
        console.log(data);
        setResData(data)
      }
    )
    setUserName('')
  }


  return (
    <>
      <div className="container">
      <form onSubmit={handleSubmit} className='formCard'>
        <input type='text' onChange={handleUsernameInput} value={userName} />
        <button>Submit</button>
      </form>

      {
        resData && (resData.message != 'Not Found') && (
          <div className='userDetailCard'>
              <div className='userDetailBody'>
                <p className='name'>{resData.name}</p>
                <em className='username'>{resData.login}</em>
                <div className='follow'>
                  <p>Followers : {resData.followers}</p>
                  <p>Following : {resData.following}</p>
                </div>
                <div className='profDetail'>
                  <p>🏢 {resData.company}</p>
                  <p>🗒️ {resData.bio}</p>

                </div>
              </div>
              <div className='userImage'>
                <img src={resData.avatar_url} alt="avatar" />
              </div>
          </div>
        )
      }
    </div>
    </>
    
  );
}

export default App;
