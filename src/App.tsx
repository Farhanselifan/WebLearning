
import Header from "./Component/Header";
import Praktikum from "./Component/Praktikum";
import Modul2 from "./Component/Modul2";
import CounterApp from "./Component/CounterApp";
import TodoList from "./Component/TodoList";
import SearchFilter from "./Component/SearchFilter";
import Modul3 from "./Component/Modul3";
import "./index.css";





const App = () => {
  return (
    <div className=''>
      <Header  />
      <div className="min-md: flex justify-center items-center bg-gray-100 p-10">
        <Praktikum 
        name="Farhan Abdurrahman"
        studentId="12345600999"
        grade={99}
        subjects={["Math", "Science", "English"]}     />
      </div>
      <div className='flex justify-center p-20'>
        <Modul2 />
      </div>
      <div className='flex justify-center p-20 bg-neutral-100'>
        <CounterApp/>
      </div>
      <TodoList />
      <SearchFilter />
      <Modul3 />
    </div>
    
  );
};

export default App;