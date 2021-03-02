import { useCallback, useEffect, useMemo, useState } from 'react';

function App() {
     const[texto,setTexto] = useState([]);
     const[input,setInput] = useState("");


     useEffect(()=>{
      const dadosStorage = localStorage.getItem('texto');
      if(dadosStorage){
        setTexto(JSON.parse(dadosStorage));
      }
  },[]);
 
   useEffect(()=>{
     localStorage.clear();
     localStorage.setItem('texto',JSON.stringify(texto)); 
   },[texto]);
  
  // e uma função para atualizar algo especifico que não desejamos ser 
  //rederizado no returno do JSX
  const totalTarefas = useMemo(()=>
    texto.length,[texto]);
 
  const inserir = useCallback(()=>{
     setTexto([...texto,input]);
     setInput('');
  },[texto,input])


  /* Esta função quando utiliza hooks e sempre recriada quando e chamada
  gera muito processamento. Por esse motivo tem o useCalback
  function inserir(){
    setTexto([...texto,input]);
    setInput('');
  }  */

  return ( 
    <div>    
      <nav>
        {texto.map(item=>(
          <li key={item}>{item}</li>
        ))}
      </nav><br/>
    <strong>Você tem um total {totalTarefas} tarefas!</strong><br/>
    <input type="text" value={input} onChange={(e=>{setInput(e.target.value)})}/>
    <button type="button" onClick={inserir}>Inserir dados</button> 
   </div>
  );
}

export default App;
