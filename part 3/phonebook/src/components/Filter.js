import React from "react";

// const Filter =({newFilterword,setNewFilterword,persons})=>{

//  //const personsCopy ={...persons}

//  const filterByValue = function filterByValue(arr, word) {
//   return arr.filter(o =>
//       Object.keys(o).some(k => o[k].toLowerCase().includes(word.toLowerCase())));
// }

// const result = filterByValue(persons,newFilterword);
// console.log('result',result)

//   const handleFilterwordChange =(event)=>{
//     setNewFilterword(event.target.value)
//   }

//   return(
//     <div>
//       filter shown with a <input value={newFilterword} onChange={handleFilterwordChange}/>
//     </div>
//   )
// }

//不在组件中写任何函数和算法，并在APP根组件下进行遍历显示
const Filter = ({ filterResult }) => {
  return (
    <li>
      {filterResult.name} {filterResult.number}
    </li>
  );
};

export default Filter;
