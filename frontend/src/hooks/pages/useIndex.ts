import { ApiService } from './../../services/ApiService';
import { useEffect, useState } from "react";
import { Teacher } from "../../@types/teacher"

export function useIndex() {
    const [listTeacher, setListTeacher] = useState<Teacher[]>([])
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
      ApiService.get('/professores').then((response) => {
        setListTeacher(response.data)
      })
    }, []);

    useEffect(() => {
      clearForm();
    }, [selectedTeacher])

    function scheduleClass() {
      if (selectedTeacher !== null) {
        if (validateClassData()) {
          ApiService.post('/professores/' + selectedTeacher.id + '/aulas', {
            name, 
            email
          }).then(() => {
            setSelectedTeacher(null);
            setMessage('Cadastrado com sucesso');
          }).catch((error) => {
            setMessage(error.response.data.message);
          })
        } else {
          setMessage('Preencha os dados corretamente');
        }
      }
    }

    function validateClassData() {
      return name.length > 0 && email.length > 0;
    }
    
    function clearForm() {
      setName('');
      setEmail('');
    }

    return {
      listTeacher,
      name,
      setName,
      email,
      setEmail,
      selectedTeacher,
      setSelectedTeacher,
      scheduleClass,
      message,
      setMessage
    }
}