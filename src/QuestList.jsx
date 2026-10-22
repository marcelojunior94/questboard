import React, { useState } from 'react';
import deleteIcon from "./assets/delete.svg";
import addIcon from "./assets/add.svg";
import { useLocalStorage } from './useLocalStorage';

function QuestList({ icon, title, iconTop, signTop }) {

    const [quests, setQuests] = useLocalStorage(`quests-${title}`, []);
    const [text, setText] = useState('');
    const limiteMaximo = 35;

    function handleInputChange(event) {
        if (event.key === 'Enter') return;
        setText(event.target.value);
        
    }

     const handleChange = (e) => {
    if (e.target.value.length <= limiteMaximo) {
      setValor(e.target.value);
    }
  };

    function alternar(id){
        setQuests(quests.map((q) => q.id === id ? {...q, feita: !q.feita,  } : q));
    }

  function addQuest() {
    if (!text.trim()) return;
    setQuests([...quests, { id: Date.now(), text, feita: false }]);
    setText("");

  }
    

    function deleteQuest(id){
        setQuests(quests.filter((q) => q.id !== id));
    }

    function moveQuestUp(id){
        
        const index = quests.findIndex((q) => q.id === id);

        if(index <= 0) return;{
            const updatedQuest = [...quests];
            [updatedQuest[index -1 ], updatedQuest[index]] =
            [updatedQuest[index], updatedQuest[index - 1]];
            setQuests(updatedQuest);
        }
    }

    function moveQuestDown(id){
     
        const index = quests.findIndex((q) => q.id === id);

        if(index === -1 || index >= quests.length - 1) return;
            const updatedQuest = [...quests];
            [updatedQuest[index], updatedQuest[index + 1]] =
            [updatedQuest[index + 1], updatedQuest[index]];
            setQuests(updatedQuest);
        
    }


    return (
        <section className='quest-column'>
            <h1 className='quest-title' style={{ '--icon-top': iconTop, '--sign-top': signTop }}>
                    <img className='quest-icon' src={icon} alt="" />
                    <span className='titulo'>{title}</span>
            </h1>  

                <div className='newquest-box'>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Nova quest...'
                        maxLength={35}
                        />
                        <span className='char-leng'>{text.length} / {limiteMaximo}</span>
                        <button
                        className='add-button'
                        onClick={addQuest}>
                            <img src={addIcon} alt="" height="50"/>
                        </button>
                </div>

        <section  className='questboard'>    
            <div>
                <ul>
                    {quests.map((q) => (
                    <li key={q.id}>
                        <label>
                            <input className='custom-check'
                            type="checkbox"
                            checked={q.feita}
                            onChange={() => alternar(q.id)}
                            />
                            <span
                            className='quest-text'
                            style={{ textDecoration: q.feita ? 'line-through' : "none"} }
                            >{q.text}</span>
                        </label>
                        <div className='quest-actions'>
                            <button
                            className='move-button'
                            onClick={() => moveQuestUp(q.id)}>  
                            ☝️
                        </button>
                        <button
                            className='move-button'
                            onClick={() => moveQuestDown(q.id)}>  
                            👇
                        </button>
                        <button
                            className='delete-button'
                            onClick={() => deleteQuest(q.id)}>  
                            <img src={deleteIcon} alt=""/>
                        </button>
                        </div>                        
                        
                    </li>
                    ))}
                </ul>
                </div>
    </section>
</section>
    );
}

export default QuestList;