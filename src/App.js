import React,{useState,useEffect, useSyncExternalStore} from 'react';
import './App.css';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import axios, { Axios }  from 'axios';
function App() {

  const BtnFun =  ()=>{
    return <button onClick={()=>{ alert("Customer bloked!");}}>Block</button>
  }

  const[data,setData] = useState([]);
  const [colDef,setColDef] = useState([
    {field:"id" ,flex:1,headerName:"S.No.",valueFormatter:(cell)=>  `-> ${cell?.value}`},
    {field:"name",flex:1, headerName:"Customer Name",filter:true,checkboxSelection:true},
    {field:"email",flex:1,headerName:"Email-ID",filter:true, floatingFilter:true},
    {field:"address", headerName:"Address", flex:2,valueGetter:({data})=>{
      const {street,suite,city,zipcode} = data.address;
      return `${street}, ${suite}, ${city}, (${zipcode}), `;
    }},
    {field:"phone",headerName:"Phone No.",flex:1},
    {field:"website",headerName:"Web URL",flex:1},
    {
      field:"action",
      cellRenderer:BtnFun
    }
  ]);
  useEffect(()=>{
    callAPI();
  },[]);


  const callAPI = async()=>{
        const data = await axios.get("https://jsonplaceholder.typicode.com/users");
        setData(data?.data);
        // console.log(data?.data);
      }
  return (
    <div className="App">
      <h3>AG GRID EXAMPLE</h3>
      <div
        className="ag-theme-quartz-dark" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
        <AgGridReact 
        rowData={data} 
        columnDefs={colDef} 
         rowSelection='multiple' 
         pagination={true}
         paginationPageSize={5}
         paginationPageSizeSelector={[5,10,15,20,25]}
         />
    </div>
    </div>
  );
}

export default App;
