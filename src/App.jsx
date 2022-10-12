import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addRecord, removeRecord } from './store/features/students/studentsSlice'
import CreateRecord from './CreateRecord'
import Filter from './Filter'
import List from './List'
import {Box, Container, Snackbar, Stack, Alert, Button, IconButton} from '@mui/material';
import { studentClasses } from './utils/constants'
import logo from '../src/assets/student.png'
import {useTranslation} from 'react-i18next'
import en from '../src/assets/icons/en.ico'
import de from '../src/assets/icons/de.ico'
import fr from '../src/assets/icons/fr.ico'


const App = () => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation()
  const { studentsData } = useSelector((state) => state.students);
  const [name, setName] = useState('');
  const [score, setScore] = useState(null);
  const [selectedClass, setSelectedClass] = useState('')
  const [allClasses, setAllClasses] = useState(studentClasses)
  const [records, setRecords] = useState([])
  const [openToast, setOpenToast] = useState(false);
  const [error, setError] = useState('')

  useEffect(() => {
    setRecords(studentsData)
  }, [studentsData])

  const handleNameInput = e => {
    const { value } = e.target
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setName(value);
    } else {
      setError(t("errors.mustHaveLetters"))
      setTimeout(() => {
        setError('')
      }, 5000);
    }
  };

  const handleScoreInput = e => {
    const { value } = e.target
    if (/^[a-z]/i.test(value)) {
      setError(t("errors.mustBeANumber"))
      setTimeout(() => {
      }, 5000);
    }else{
      setError('')
    }
    const onlyNums = value.replace(/[^0-9]/g, '');
    if (onlyNums <= 100) {
      setScore(onlyNums)
    } else if (onlyNums > 100) {
      setError(t("errors.mustBeGreater"))
      setTimeout(() => {
        setError('')
      }, 5000);
    }
  };

  const handleClassChange = (selection) => {
    const changed = studentClasses.map((i) => {
      if (i.name === selection.name) {
        return { ...i, checked: !i.checked };
      } else {
        return { ...i, checked: false };
      }
    });
    setSelectedClass(selection.name)
    setAllClasses(changed)
  }

  const handleCreateRecord = () => {
    if (name === '') {
      setError(t("errors.noName"))
      return setTimeout(() => {
        setError('')
      }, 5000);
    }

    if (score === '' || score == null) {
      setError(t("errors.noNumber"))
      return setTimeout(() => {
        setError('')
      }, 5000);
    }
    if (selectedClass === '') {
      setError(t("errors.noClass"))
      return setTimeout(() => {
        setError('')
      }, 5000);
    }
    if (name !== '' && score !== '' && selectedClass !== '') {
      dispatch(addRecord({ name, score, selectedClass }))
      setName('')
      setScore('')
      setAllClasses(studentClasses)
      setSelectedClass('')
      setError('')
      handleToastClick()
    }
  }

  const handleDeleteRecord = (student) => {
    dispatch(removeRecord(student))
  }


  const handleToastClick = () => {
    setOpenToast(true);
  };

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };



const changeLanguage = (language) => {
  i18n.changeLanguage(language)
}
  return (
    <Container maxWidth="md" sx={{ marginTop: '1rem' }}>
      <IconButton sx={{ boxShadow: '1px 1px 10px 1px #000000', padding: '0', marginRight: '0.8rem' }}
        onClick={() => changeLanguage("en")}>
        <img style={{ width: '1.5rem' }} src={en} /></IconButton>
      <IconButton sx={{ boxShadow: '1px 1px 10px 1px #000000', padding: '0', marginRight: '0.8rem' }}
        onClick={() => changeLanguage("fr")}>
        <img style={{ width: '1.5rem' }} src={fr} /></IconButton>
      <IconButton sx={{ boxShadow: '1px 1px 10px 1px #000000', padding: '0' }}
        onClick={() => changeLanguage("de")}>
        <img style={{ width: '1.5rem' }} src={de} /></IconButton>
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'right'}} open={openToast} 
      autoHideDuration={2000} onClose={handleToastClose}>
        <Alert variant="filled"  onClose={handleToastClose} severity="success" sx={{ width: '100%' }}>
        {t("toast.success")}
        </Alert>
      </Snackbar>
    </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box
          component="img"
          sx={{ height: 140, marginTop: '1rem' }}
          alt="exam logo"
          src={logo}>
        </Box>
      </Box>
      <CreateRecord 
      allClasses={allClasses}
      name={name} 
      score={score} 
      error={error}
      handleCreateRecord={handleCreateRecord} 
      handleClassChange={handleClassChange} 
      handleNameInput={handleNameInput} 
      handleScoreInput={handleScoreInput}/>
      <Filter 
      records={records} 
      setRecords={setRecords} />
      {records.length !== 0 && 
      <List 
      records={records} 
      handleDeleteRecord={handleDeleteRecord} />}
    </Container>
  );
}

export default App;
