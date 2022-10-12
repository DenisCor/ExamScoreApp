import React from 'react'
import { Paper, Grid, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, Typography, Alert, Stack } from '@mui/material';
import {useTranslation} from 'react-i18next'

const CreateRecord = ({ score, name, allClasses, handleClassChange, handleNameInput, handleScoreInput, handleCreateRecord, error }) => {
  const {t, i18n} = useTranslation()

  return (
    <Paper square elevation={4} sx={{ bgcolor: '#fcfbfc' }}>
      <Grid container spacing={0} 
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem' }}>
        <Grid item lg={5} md={5} xs={12} sx={{ padding: '0.5rem' }}>
          <TextField label={t("createRecord.studentName")} variant="standard" sx={{ width: '100%' }} value={name} onChange={e => handleNameInput(e)} />
        </Grid>
        <Grid item lg={2} md={2} xs={12} sx={{ padding: '0.5rem' }}>
          <TextField label={t("createRecord.score")} variant="standard" sx={{ width: '100%' }} value={score} onChange={e => handleScoreInput(e)} />
        </Grid>
        <Grid item lg={2} md={2} xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <FormControl sx={{ padding: '0.5rem 0' }}>
            <Typography variant="subtitle2"> {t("createRecord.class")}</Typography>
            <RadioGroup
              aria-labelledby="classes-radio-buttons"
              defaultValue="female"
              name="radio-buttons-classes-group"
            >
              {allClasses.map(selection => (
                <FormControlLabel key={selection.id} sx={{ padding: '0 0.5rem' }} value={selection.name} control={<Radio sx={{ padding: '0.2rem' }} size="small" checked={selection.checked} onClick={() => handleClassChange(selection)} />} label={selection.name} />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item lg={3} md={3} xs={12}>
          <Button variant="contained" sx={{ width: '100%' }} onClick={handleCreateRecord}>{t("createRecord.createRecordBtn")}</Button>
        </Grid>
      </Grid>
      {error && <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error">{error}</Alert>
    </Stack>}
    
    </Paper>
  )
}
export default CreateRecord;
