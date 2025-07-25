import Praktikum from "./Praktikum";
import Modul2 from "./Modul2";
import CounterApp from "./CounterApp";
import SimpleCounter from "./SimpleCounter"
import TodoList from "./TodoList";
import FormNuseState from "./FormNuseState"
import SearchFilter from "./SearchFilter";
import Modul3 from "./Modul3";
import UseEfek from "./UseEfek";
import UseContext from "./UseContext";
import UseReducer from "./UseReducer";
import { Counter } from '../features/counter/Counter';
import UsersList from "./UserdList";
import UserManager from "./UserManager";
import UserRegistrationForm from "./UserRegistrationForm";


const LearningProcess = () => {
    return (
    <div>
      <UserRegistrationForm />
      <UserManager />
      <UsersList />
      <Counter />
      <UseReducer />
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

export default LearningProcess;