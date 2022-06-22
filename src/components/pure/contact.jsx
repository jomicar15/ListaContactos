import React from 'react';
import '../../css/contact.css'


const Contact = ({usuario,changeStatus,removeContact,showContact}) => {

  return (
        <tr>
            <td className='user' onClick={()=>{showContact(usuario)}} style={{cursor:'pointer'}}> {usuario.name}</td>
            <td className={usuario.status? 'connected':'disconnected' } >{usuario.status ? 'Connected':'Disconnected'}</td>
            <td>{usuario.status ? 
            <i  className="bi bi-toggle2-on" onClick={()=>{changeStatus(usuario)}}></i>
            :
            <i  className="bi bi-toggle2-off" onClick={()=>{changeStatus(usuario)}}></i>}</td>
            <td>{<i className="bi bi-person-x-fill" onClick={()=>{removeContact(usuario)}}></i>}</td>
        </tr>
  )
}

export default Contact;
