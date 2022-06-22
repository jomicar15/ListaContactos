import './App.css';
import ContactList from './components/container/contactList';


function App() {
  return (
    <div className="text-center mt-5">
      <h1>Lista de Contactos</h1>
      <div className='lista'>
          <ContactList/>
      </div>
    </div>
  );
}

export default App;
