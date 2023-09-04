import React from 'react';


import { useState } from 'react';
import { io } from 'socket.io-client';


function App() {
  const socket = io("http://localhost:3001",{
    // rejectUnauthorized: false
  }); //백엔드 서버 포트를3001와 socket연결 

  const initialValue = {
    name: "",
    msg:"",
  }
  
  const [val, setValue] = useState<any>(initialValue);

  const {name, msg} = val;	//비구조화 할당
  
  const [msgList, setMsgList] = useState<any[]>([]);
  
 

  
  const sendMessage = (e:any) => {
    e.preventDefault();
    socket.emit("send message",{
      name: val.name,
      msg: val.msg,
    })
  
    setValue(initialValue);
  }
  
  // const messageComponentMount = () => {
  //   socket.on("receive message",(message)=>{
  //     setMsgList([...msgList,message]);
  //   })
  // }

  socket.on("receive message",(message)=>{
    setMsgList([...msgList,message]);
  })
  
  const onChange = (e:any) => {
    const {value, name:name} = e.target;
    setValue({...val,[name]:value});
  }
  return (
    <div className="App">
      <section className="chat_list">
        {msgList.map((item,index) => (
          <div className="messagelist" key={index}>
            <p className="username">{item.name}</p>
            <p className="msg_text">{item.msg}</p>
          </div>
        ))}
      </section>
      <form className="chat_con" onSubmit={sendMessage}>
          <div className="chat_inputs">
            <input type="text" onChange={onChange} value={val.name} name="name" placeholder="아이디"/>
            <input type="text" onChange={onChange} value={val.msg} name="msg" placeholder="메세지내용"/>
          </div>
          <button className="chat_button" type="submit">
            보내기
          </button>
        </form>
      
    </div>
  );
}

export default App;
