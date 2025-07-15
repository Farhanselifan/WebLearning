
import Header from "./Component/Header";
import Praktikum from "./Component/Praktikum";
import Modul2 from "./Component/Modul2";
import CounterApp from "./Component/CounterApp";
import SimpleCounter from "./Component/SimpleCounter"
import TodoList from "./Component/TodoList";
import FormNuseState from "./Component/FormNuseState"
import SearchFilter from "./Component/SearchFilter";
import Modul3 from "./Component/Modul3";
import UseEfek from "./Component/UseEfek"
import UseContext from "./Component/UseContext"
import "./index.css";





const App = () => {
  return (
    
    <div className=''>
      <Header  />
      <UseContext />
      <UseEfek />
      <div className="min-md: flex justify-center items-center bg-orange-100 p-10">
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
      <div className = 'flex justify-center p-40 bg-blue-100'> 
        <SimpleCounter />
      </div>
      <div className = 'flex justify-center p-30'> 
        <FormNuseState />
      </div>
      <TodoList />
      <SearchFilter />
      <Modul3 />
      
    </div>
    
  );
};

export default App;