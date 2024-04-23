/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import Counter from '../components/Counter';
import Title from '../components/Title';
import Button from '../components/Button';

const HomePage: React.FC = () => {
  const [age, setAge] = useState(25)
  const [salary, setSalary] = useState(2500)
  
  const incrementAge = useCallback(()=>{
    setAge(age + 1);
  },[age]);
  const incrementSalary = useCallback(()=>{
    setSalary(salary + 100);
  },[salary]);
  return (
    <div className="home-page" style={{textAlign:'center', border:"1px solid red"}}>
      <Title/>
      <Counter text={'age'} number={age} />
      <Button clickHandler={incrementAge}>Age</Button>
      <Counter text={'salary'} number={salary} />
      <Button clickHandler={incrementSalary}>Salary</Button>
    </div>
  );
};

export default HomePage;

//USE MEMO

// export default function App() {
//   const [user, setUser] = useState({
//     name: "rithesh",
//     age: 25,
//   });
//   const [color, setColor] = useState(true);
//   const addUserAge = (number) => {
//     console.log("rendered", number);
//     return number * 2;
//   };
//   const userAge = useMemo(() => addUserAge(user.age), [user]);
//   // const userAge = addUserAge(user.age);
//   const onAgeChange = (e) => {
//     setUser({ ...user, age: e.target.value });
//   };
//   const onChangeCOlor = () => {
//     setColor(!color);
//   };
//   return (
//     <div className="App">
//       <input type="number" onChange={onAgeChan ge} />
//       <div>
//         <button onClick={onChangeCOlor}>change color</button>
//       </div>
//       <h2 style={{ color: color ? "red" : "orange" }}>{userAge}</h2>
//     </div>
//   );
// }

