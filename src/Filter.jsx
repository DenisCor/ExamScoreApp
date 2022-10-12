import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { Paper, Grid, Checkbox, Button, FormControlLabel, Typography, FormGroup, Slider, Box } from '@mui/material';
import { studentClasses, sortBy } from './utils/constants'
import {useTranslation} from 'react-i18next'

const Filter = ({ records, setRecords }) => {
  const {t, i18n} = useTranslation()
  const checkAllClasses = studentClasses.map(each => ({ ...each, checked: true }))
  const { studentsData } = useSelector((state) => state.students);
  const [allFilterClasses, setAllFilterClasses] = useState(checkAllClasses)
  const [allFilterSortBy, setAllFilterSortBy] = useState(sortBy)
  const [sliderValue, setSliderValue] = useState([0, 100]);



  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };
  const handleClassChange = (selection) => {
    const newArray = allFilterClasses.map(each => {
      if (each.name === selection.name) {
        return { ...each, checked: !each.checked }
      } else {
        return each
      }
    })
    setAllFilterClasses(newArray)
  }

  const handleSortByChange = (selection) => {
    const newArray = allFilterSortBy.map(each => {
      if (each.name === selection.name) {
        return { ...each, checked: !each.checked }
      } else {
        return { ...each, checked: false }
      }
    })
    setAllFilterSortBy(newArray)
  };

  const resetFilter = () => {
    setAllFilterClasses(checkAllClasses)
    setAllFilterSortBy(sortBy)
    setSliderValue([0, 100])
    setRecords(studentsData)
  }

  const applyFilter = () => {
    const sortOption = allFilterSortBy.find(option => option.checked === true)
    console.log('sortOption', sortOption)
    const newArr = studentsData.filter(each => {
      if ((parseFloat(each.score) >= sliderValue[0]) && (parseFloat(each.score) <= sliderValue[1])) {
        return { ...each }
      }
    }).filter(each => {
      const found = allFilterClasses.some(eachClass => ((eachClass.checked === true) && (eachClass.name === each.selectedClass)))
      if (found) {
        return { ...each }
      }
    })
    if (sortOption.name === 'Name: Alphabetical') {
      let newUsers = newArr.sort((a, b) => a.name.localeCompare(b.name));
      return setRecords(newUsers)
    } else if (sortOption.name === 'Score: High to Low') {
      let newUsers = newArr.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
      return setRecords(newUsers)
    }
    setRecords(newArr)
  }

  return (
    <Paper square elevation={4} sx={{ bgcolor: '#fcfbfc', marginTop: '1rem' }}>
      <Grid container spacing={0} sx={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        <Grid item lg={5} md={5} xs={12} sx={{ padding: '0 1rem' }}>
          <Typography sx={{ marginLeft: '-0.5rem' }} variant="subtitle2">{t("createRecord.score")}</Typography>
          <Box sx={{ padding: '0.8rem 0.4rem' }}>
            <Slider
              getAriaLabel={() => 'Score Range'}
              value={sliderValue}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
            />
          </Box>
        </Grid>
        <Grid item lg={1} md={4} xs={4} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 2rem' }}>
          <Typography variant="subtitle2">{t("createRecord.class")}</Typography>
          <FormGroup>
            {allFilterClasses.map(selection => (
              <FormControlLabel key={selection.id} value={selection.name} sx={{ padding: '0 0.5rem' }} control={<Checkbox onClick={() => handleClassChange(selection)} sx={{ padding: '0.2rem' }} size="small" checked={selection.checked} />} label={selection.name} />
            ))}
          </FormGroup>
        </Grid>
        <Grid item lg={4} md={8} xs={8} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: '0 1rem' }}>
          <Typography variant="subtitle2">{t("filter.sortBy")}</Typography>
          <FormGroup>
            {allFilterSortBy.map(selection => (
              <FormControlLabel key={selection.id} sx={{ padding: '0 0.2rem' }} control={<Checkbox onClick={() => handleSortByChange(selection)} sx={{ padding: '0.2rem' }} size="small" checked={selection.checked} />} label={selection.name === 'Default' && t("filter.default") || selection.name === 'Name: Alphabetical' && t("filter.byName") || selection.name === 'Score: High to Low' && t("filter.byScore") } />
            ))}
          </FormGroup>
        </Grid>
        <Grid item lg={2} md={2} xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '5rem', marginTop: '1rem' }}>
          <Button variant="outlined" sx={{ width: '100%'}} onClick={resetFilter}>{t("filter.resetFilterBtn")}</Button>
          <Button variant="contained" sx={{ width: '100%' }} onClick={applyFilter}>{t("filter.filterBtn")}</Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Filter;