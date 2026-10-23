import QuestList from "./QuestList.jsx";
import mainIcon from "./assets/main3.svg";
import sideIcon from "./assets/side.png";
import weeklyIcon from "./assets/weekly.png";
import monthlyIcon from "./assets/monthly.png";
import coinIcon from "./assets/coin.svg"

const lists = [
  { icon: mainIcon, title: "Main Quests", description: "Completar todas no dia: +1", secIcon: coinIcon},
  { icon: sideIcon, title: "Side Quests", description: "Completar todas no dia: +2", secIcon: coinIcon },
  { icon: weeklyIcon, title: "Semanais", description: "Cada quest concluída: +3", secIcon: coinIcon },
  { icon: monthlyIcon, title: "Mensais", description: "Cada quest concluída: +5", secIcon: coinIcon },
];

function App(){
  return (
    <div className="board">
      {lists.map((list) => (
        <QuestList
        key={list.title}
        icon={list.icon}
        title={list.title}
        description={list.description}
        secIcon={coinIcon}/>
      ))}
    </div>
  );
}

export default App;