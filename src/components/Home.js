import {useState, useEffect, React} from 'react'
import axios from 'axios';


function Home() {
    const [tasks, setTasks] = useState([]);
    const [name, setName] = useState("");
    
    

    const addTask = async (e) => {
        e.preventDefault();
        await axios.post('https://8cjy6zcer1.execute-api.us-west-1.amazonaws.com/staging/api/post', {
            name
        });
        window.location.href= '/';
        
    }

    const getTasks = async() => {
        const response = await axios.get("https://8cjy6zcer1.execute-api.us-west-1.amazonaws.com/staging/api/get");
        console.log(response);
        setTasks(response.data);
    }

    const deleteTask = async(name) => {
        await axios.delete(`https://8cjy6zcer1.execute-api.us-west-1.amazonaws.com/staging/api/delete/:${name}`);
        window.location.href= '/'
    }

    // const updateTask = async(id, name) => {
    //     const updatedName = name}
    //     await axios.patch(`http://localhost:5000/api/update/:${id}`, updatedName);
    // }

    useEffect(() => {
        getTasks();
    }, [])

    return (
            <div className="container">

                <form onSubmit={addTask}>
                    <div class="form-group">
                        <input type="text"  value={name} onChange={(e) => setName(e.target.value)} class="form-control" placeholder="Introduceti task"/>
                    </div>
                    <button type="submit" class="btn btn-secondary">Submit</button>
                </form>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Task</th>
                            <th scope="col">Status</th>  
                            <th scope="col">Delete</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        tasks.map((task) => (
                            <tr key={task._id}>
                                
                                <td>
                                    
                                    {task.name} 
                                    </td> 
                                <td>
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                </td>
                                <td >
                                <button onClick={() => deleteTask(task.name)} type="submit" className="btn btn-danger">X</button>
                                </td>
                                <td >
                                <button type="submit" className="btn btn-success">...</button>
                                </td>
                            
                            </tr>
                        ))          
                    }
                    </tbody>
                </table>
            </div>

        
    )
}

export default Home
