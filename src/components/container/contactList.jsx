import React, { useState, useRef } from 'react';
import Contact from '../pure/contact';
import { User } from '../../models/userClass';
import '../../css/contactList.css'


const ContactList = () => {

    const userList = [
        new User('Pedro','Rodriguez',false,20),
        new User('Carlos','Perez',true,28),
        new User('Ana','López',false,33),
    ];
    
    const [list, setList] = useState(userList);
    const [usuarioPrueba,setUsuarioPrueba] = useState('');
    const [mostrarFormulario,setMostrarFormulario] = useState(false);
    const [msjError,setMsjError] = useState('');

    const refName = useRef('');
    const refLastName = useRef('');
    const refAge = useRef('');

    const changeStatus = (usuario) =>{

        const index = list.indexOf(usuario);
        const tempUserList = [...list];
        tempUserList[index].status = !tempUserList[index].status;   
        eraseModal();
        setList(tempUserList);
    }

    const removeContact = (usuario) =>{

        const index = list.indexOf(usuario);
        const tempUserList = [...list];
        tempUserList.splice(index,1);
        eraseModal()
        setList(tempUserList);
    }
    
    const createContact = (ev) =>{

        ev.preventDefault();
        const name=refName.current.value;
        const lastName=refLastName.current.value;
        const age=refAge.current.value;
        let valid = true;
        let arrayError = [];
        setMsjError(msjError);

        if(isNaN(age) || age>120 || age===''){
            arrayError.push(`La edad es incorrecta`);
            valid=false;
        }

        if(lastName ===''){
            arrayError.push(`El apellido no es válido`);
            valid=false;
        }

        if(name ===''){
            arrayError.push(`El nombre no es válido`);
            valid=false;
        }

        if(!valid) setMsjError(arrayError);
    
        if(valid){
            const tempUserList = [...list];
            tempUserList.push(new User(name,lastName,false,age));
            ev.target.reset();
            setMsjError('');
            setList(tempUserList);
        }


    }

    const displayForm = ()=>{
        setMostrarFormulario(!mostrarFormulario);
    }

    const eraseModal = ()=>{
        setUsuarioPrueba('');
    }

    const showContact =(usuario)=>{
        const index = list.indexOf(usuario);
        setUsuarioPrueba(list[index]);
    }
    

    // console.log("el usuario de prueba tiene:",usuarioPrueba)
    return (
        <div className='flex'>
            <table hidden={list.length>0? false : true}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Status</th>
                        <th className='btn-change-status'></th>
                        <th className='remove'></th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((elemento,index)=>
                        <Contact 
                        key={index} 
                        usuario={elemento} 
                        changeStatus={changeStatus}
                        removeContact={removeContact}
                        showContact={showContact}
                        />
                        )
                    }
                </tbody>
            </table>
            {
                // Show individual user information
                usuarioPrueba!=='' ?
                    <div className='description rel'>
                        <i className="absol bi bi-x" onClick={eraseModal} style={{cursor:'pointer'}}></i>
                        <p><span>Nombre:</span> {usuarioPrueba.name}</p>
                        <p><span>Apellido:</span> {usuarioPrueba.lastName}</p>
                        <p><span>Edad:</span> {usuarioPrueba.age}</p>
                    </div>
                : ""}
            
            <button className='mt-3' onClick={displayForm}>Crear contacto</button>
            {
                // compare to display or not form
                mostrarFormulario ?
                    <div>
                        <form className='mt-3 rel' onSubmit={createContact}>
                            <i className="bi bi-x form-del absol" style={{cursor:'pointer'}} onClick={displayForm}></i>
                            Nombre: <input ref={refName} type="text" placeholder='Ingrese Nombre' ></input>
                            Apellido: <input ref={refLastName} type="text" placeholder='Ingrese Apellido'></input>
                            Edad: <input ref={refAge} type="text" placeholder='Ingrese Edad'></input>
                            <ul >
                                {
                                    // Compare if the error message have any item
                                    msjError.length > 0 ?
                                    msjError.map((error,index)=>{
                                        //return list element with error
                                        return(<li key={index}>{error}</li>)
                                    })
                                    : ""
                                }
                            </ul>
                            <input type="submit" value="Añadir"></input>
                        </form>
                    </div>
                : ""}
        </div>

    );
};


export default ContactList;
