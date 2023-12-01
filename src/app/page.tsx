'use client'
import { ListTodo } from "@/components/ListTodo";

import { FormEvent, useEffect, useState } from "react"; 
import { startMirage } from "../../mirage";
import useSWR from "swr";
import { fetcher } from "@/libs/fetcher";

startMirage();

export default function Home() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const { data, error, isLoading } = useSWR<any>(`/api/user`, fetcher);

  const handlerChangeUserName = (value: any) => {
    setUserName(value);
  }

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const user = {
      name: userName,
    };
    
    await fetch('/api/user', {
      'method': 'POST',
      'headers': {
        "Content-Type": "application/json",
      },
      'body': JSON.stringify(user)
    })
    .then(data => data.json())
    .then(({users}) => setUsers(users))

    setUserName('')
  }

  useEffect(()=>{
    if(data?.users) {
      setUsers(data?.users);
    }

  },[data, isLoading]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <ListTodo users={users} />
      <form onSubmit={handlerSubmit}>
        <div>
          <label htmlFor="nameTodo">Nome</label>
          <input 
            type="text" 
            name="nameTodo" 
            id="nameTodo"
            value={userName}
            onChange={({target}) => handlerChangeUserName(target.value)}
            placeholder="Informe seu nome"/>
        </div>
        <div>
          <input id="submitForm" type="submit" value="Salvar" />
        </div>
      </form>
    </>
  )
}
