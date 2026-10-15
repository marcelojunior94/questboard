import QuestList from "./QuestList.jsx";
import mainIcon from "./assets/main.png";
import sideIcon from "./assets/side.png";
import weeklyIcon from "./assets/weekly.png";
import monthlyIcon from "./assets/monthly.png";

const lists = [
  { icon: mainIcon, title: "MAIN QUESTS" },
  { icon: sideIcon, title: "SIDE QUESTS" },
  { icon: weeklyIcon, title: "SEMANAIS" },
  { icon: monthlyIcon, title: "MENSAIS" },
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