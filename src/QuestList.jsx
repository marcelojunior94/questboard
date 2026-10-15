import React, { useState } from 'react';
import xIcon from "./assets/x.png";
import Sign from "./assets/sign.png"

function QuestList({ icon, title, iconTop, signTop }) {


    const [quests, setQuests] = useState([]);
    const [text, setText] = useState('');

    function handleInputChange(event) {
        if (event.key === 'Enter') return;
        setText(event.target.value);
        
    }

  function addQuest() {
    if (!text.trim()) return;
    setQuests([...quests, { id: Date.now(), text, done: false }]);
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
                    <span>{title}</span>
            </h1>  
        <section  className='questboard'>    
            <div>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder='Nova quest...'
                        
                        />
                        <button
                        className='add-button'
                        onClick={addQuest}>
                            +
                        </button>

                <ul>
                    {quests.map((q) => (
                    <li key={q.id}><span className='quest-text'>{q.text}</span>
                        <button
                            className='delete-button'
                            onClick={() => deleteQuest(q.id)}>  
                            <img src={xIcon} alt="" height="20px" />
                            {/* 🗑️ */}
                        </button>
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
                    </li>
                    ))}
                </ul>
                </div>
    </section>
</section>
    );
}

export default QuestList;