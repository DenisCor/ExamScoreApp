import {useState} from 'react'
import { Modal, Box, Typography, Paper, Button, TableRow, TableHead, TableCell, TableBody, Table } from '@mui/material';
import { useDispatch } from 'react-redux'
import { clearAllRecords } from './store/features/students/studentsSlice'
import {useTranslation} from 'react-i18next'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 250,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const List = ({ records, handleDeleteRecord }) => {
  const {t, i18n} = useTranslation()
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  
  const handleClose = () => setOpen(false);

  const deleteAllRecords = () => {
    dispatch(clearAllRecords())
    handleClose()
  }

  return (
    <>
    <Paper square elevation={4} sx={{ bgcolor: '#fcfbfc', marginTop: '1rem' }}>
      <Table sx={{ minWidth: 250 }} aria-label="Records Table">
        <TableHead>
          <TableRow>
            <TableCell> {t("createRecord.studentName")}:</TableCell>
            <TableCell align="right">{t("createRecord.score")}:</TableCell>
            <TableCell align="right">{t("createRecord.class")}</TableCell>
            <TableCell align="right"> <Button variant="contained" color="secondary" sx={{ minWidth: '2rem' }} 
                onClick={handleOpen}> {t("list.deleteAll")}</Button></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.map((student) => (
            <TableRow
              key={student.name}
            >
              <TableCell component="th" scope="row">
                {student.name}
              </TableCell>
              <TableCell align="right">{student.score}</TableCell>
              <TableCell align="right">{student.selectedClass}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="secondary" sx={{ minWidth: '2rem' }} 
                onClick={() => handleDeleteRecord(student)}> {t("list.delete")}</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="subtitle1">
          {t("list.areYouSure")}
          </Typography>
          <Box sx={{display:'flex', justifyContent:'space-between', padding:'0.5rem'}}>
             <Button variant="contained" onClick={deleteAllRecords}> {t("list.yes")}</Button>
          <Button variant="contained" onClick={handleClose}> {t("list.no")}</Button>
          </Box>
         
        </Box>
      </Modal>
    </div>
    </>
  )
}
export default List;