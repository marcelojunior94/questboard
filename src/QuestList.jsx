import React, { useState } from 'react';
import deleteIcon from "./assets/delete.svg";
import addIcon from "./assets/add.svg";
import bonusSign from "./assets/bonus_sign.svg"
import coinIcon from "./assets/coin.svg";
import { playSound } from './sounds';
import { useLocalStorage } from './useLocalStorage';

function QuestList({ icon, title, iconTop, signTop, description }) {

    const [quests, setQuests] = useLocalStorage(`quests-${title}`, []);
    const [text, setText] = useState('');
    const limiteMaximo = 35;
    const maxTasks = 7;

     const handleChange = (e) => {
    if (e.target.value.length <= limiteMaximo) {
      setValor(e.target.value);
    }
  };

    function alternar(id){
        setQuests(quests.map((q) => q.id === id ? {...q, feita: !q.feita,  } : q));
        playSound("check")
    }

  function addQuest() {
    if (!text.trim()) return;
    if (quests.length >= maxTasks){
        alert('Limite de tasks atingido!')
        return;
    }
    setQuests([...quests, { id: Date.now(), text, feita: false }]);
    setText("");
    playSound("add");
  }

      function handleSubmit(e) {
        e.preventDefault();
        addQuest();
    }
    

    function deleteQuest(id){
        setQuests(quests.filter((q) => q.id !== id));
        playSound("delete");
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
                    <div className='description'>
                        <span>{description}</span>
                        <img src={coinIcon} alt="" />
                    </div>
            </h1>  

            <div className='bonus-sign'>
                <img src={bonusSign} alt="" height="150"/>

            </div>

                <form className='newquest-box' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        disabled={quests.length >= maxTasks}
                        placeholder={quests.length >= maxTasks ? "Limite atingido." : "Nova quest..."}
                        maxLength={35}   
                        />
                        <span className='char-leng'>{text.length} / {limiteMaximo}</span>
                        <button
                        className='add-button'
                        type='submit'>
                            <img src={addIcon} alt="" height="50"/>
                        </button>
                </form>

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
                            onKeyDown={handleChange}
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