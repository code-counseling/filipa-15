import React, { useState } from 'react'
import './App.css'
import { Hidden, makeStyles, TextField, Typography } from '@material-ui/core'
import CakeIcon from '@material-ui/icons/Cake'
import CheckIcon from '@material-ui/icons/Check'
import ErrorIcon from '@material-ui/icons/ErrorOutline'

const useStyles = makeStyles({
  form: {
    display: 'grid',
    justifyItems: 'center',
    '& .MuiTextField-root': {
      margin: 8,
      width: '27ch',
    },
  },
})

export const App = () => {
  const classes = useStyles()
  const [correctCount, setCorrectCount] = useState<number>(0)
  const onCorrect = () => {
    console.log('*')
    setCorrectCount(prev => prev + 1)
  }
  const tf = (position: number, label: string, expectedAnswer: string) => (
    <SmartTextField
      position={position}
      label={label}
      expectedAnswer={expectedAnswer}
      correctCount={correctCount}
      onCorrect={onCorrect}
    />
  )
  let position = 0
  return (
    <div className="App">
      <Typography variant={'h3'}>Happy Birthday Filipa</Typography>
      <Typography variant={'h4'}>
        15 Jahre
        <br />
        15 Fragen
        <br />
        <CakeIcon />
      </Typography>
      <form className={classes.form} noValidate autoComplete="off">
        {tf(position++, "Queen's Gambit", 'c4')}
        {tf(position++, 'Augen zu – was schmeckst Du?', 'Zitrone')}
        {tf(position++, 'Pommes oder Pizza?', 'Pommes')}
      </form>
    </div>
  )
}

interface Props {
  readonly position: number
  readonly label: string
  readonly expectedAnswer: string
  readonly correctCount: number
  readonly onCorrect: () => void
}

const SmartTextField = ({ position, label, expectedAnswer, correctCount, onCorrect }: Props) => {
  const hidden = correctCount < position
  const isAlreadyCorrect = correctCount > position
  const [value, setValue] = useState<string>('')
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const v = e.target.value
    if (v.toLowerCase() === expectedAnswer.toLowerCase() && !isAlreadyCorrect) {
      onCorrect()
    }
    setValue(v)
  }
  return (
    <Hidden xlDown={hidden}>
      <TextField
        value={value}
        label={`${position + 1}. ${label}`}
        onChange={onChange}
        InputProps={{
          readOnly: isAlreadyCorrect,
          endAdornment: isAlreadyCorrect ? (
            <CheckIcon style={{ color: 'green' }} />
          ) : (
            value !== '' && <ErrorIcon style={{ color: 'orange' }} />
          ),
        }}
      />
    </Hidden>
  )
}
