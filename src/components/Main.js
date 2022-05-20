import React, { useEffect, useState } from 'react'


const getLocaldata = () => {
    const list = localStorage.getItem("mylist");

    if(list)
    {
        return JSON.parse(list);
    }
    else{
        return [];
    }
}


const Main = () => {
    const [inputData, setinputData] = useState("");
    const [Items, setItems] = useState(getLocaldata());
    const [com, setcom] = useState([]);

    const addtask = () => {
        if (!inputData) {
            alert("Please Fill The Form");
        }
        else {
            const mynewinputdata = {
                id: new Date().getTime().toString(),
                name: inputData,
                completed: false
            }
            setItems([...Items, mynewinputdata]);
        }
    };

    const deleteitem = (index) => {
        const updated = Items.filter((currEle)=>{
            return currEle.id != index ;
        });
        setItems(updated);
    };


    const done = (currEle) => {
        let a = document.getElementById('completelist');
        a.style.display = 'block';
        setcom([...com , currEle.name]);
        deleteitem(currEle.id);
        console.log(currEle.name);
    }



    const removeAll = () => {
        let a = document.getElementById('completelist');
        setItems([]);
        setcom([]);
        a.style.display = 'none';
    };
    useEffect(()=>{
        localStorage.setItem("mylist" , JSON.stringify(Items));
    })



    return (
        <>
        <div className="window">
            <div className="container">
                <h1>To-Do List </h1>
                <div className="addsection">
                    <input type="text" id="input" placeholder="Enter the Task" value={inputData} onChange={(e) => setinputData(e.target.value)} />
                    <button className="btn" onClick={addtask}>Add</button>
                </div>

                <div className="list" id="list" >
                    <ul id="ul1">
                        {Items.map((currEle) => {
                            return (
                                
                                    <li id='itemss' key={currEle.id}>
                                        <div className="content" >{currEle.name}</div>
                                        <div className="btn-grp">
                                            <button className="btn done" onClick={()=>{
                                                done(currEle)
                                            }}>Done</button>
                                            <button className="dbtn" onClick={()=>{deleteitem(currEle.id)}}>Delete</button>
                                        </div>
                                    </li>
                            )
                        })}
                    </ul>
                </div>
                <button className="dbtn rmvall" onClick={removeAll}>Clear All</button>
            </div>
            <div className="completedtask" id='completelist'>
                <h2>Completed Tasks</h2>
                <ul  >
                        {
                            com.map((currElem)=>{
                                return(
                                    <li>
                                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"/></svg>
                                    <p>{currElem}</p>
                                    </li>
                                )
                            })
                        }

                    
                </ul>
            </div>
        </div>
            </>
    )
}

export default Main