import QuestList from "./QuestList.jsx";
import mainIcon from "./assets/main3.svg";
import sideIcon from "./assets/side.png";
import weeklyIcon from "./assets/weekly.png";
import monthlyIcon from "./assets/monthly.png";

const lists = [
  { icon: mainIcon, title: "Main Quests" },
  { icon: sideIcon, title: "Side Quests" },
  { icon: weeklyIcon, title: "Semanais" },
  { icon: monthlyIcon, title: "Mensais" },
];

function App(){
  return (
    <div className="board">
      {lists.map((list) => (
        <QuestList
        key={list.title}
        icon={list.icon}
        title={list.title} />
      ))}
    </div>
  );
}

export default App;