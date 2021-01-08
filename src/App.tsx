import React, { useState } from 'react'
import './App.css'
import { Hidden, makeStyles, TextField, Typography } from '@material-ui/core'
import CakeIcon from '@material-ui/icons/Cake'
import CheckIcon from '@material-ui/icons/Check'
import ErrorIcon from '@material-ui/icons/ErrorOutline'
import { Alert, AlertTitle } from '@material-ui/lab'

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
  let position = 0
  const tf = (label: string, expectedAnswer: string) => (
    <SmartTextField
      position={position++}
      label={label}
      expectedAnswer={expectedAnswer}
      correctCount={correctCount}
      onCorrect={onCorrect}
    />
  )
  return (
    <div className="App">
      <Typography variant={'h3'}>Happy Birthday Filipa</Typography>
      <Typography variant={'h4'}>
        15 Jahre
        <br />
        15 Fragen
        <br />
        <CakeIcon style={{ color: 'deeppink' }} />
      </Typography>
      <form className={classes.form} noValidate autoComplete="o'f">
        {tf('Check, Check: Wie heisst Du?', 'Filipa')}
        {tf('Dein Geburtsgewicht (in g)?', '2650')}
        {tf('Wie viele ganze Tage bist Du alt?', '5478')}
        {tf('Wie hiess Deine Hebamme?', 'Aline')}
        {tf('Wie hiess Dein Plüsch-Pferd?', 'Fanny')}
        {tf("So, chli Schach – Queen's Gambit!", 'c4')}
        {tf('Augen zu – was schmeckst Du?', 'Cola')}
        {tf('Schoggi oder Chips?', 'Chips')}
        {tf('Wenn E=m*c*c, dann E/(c*c)=', 'm')}
        {tf('Minecraft oder Candy Crush?', 'Minecraft')}
        {tf("Los geht's! 5.83.169.28:10260", '3')}
        {tf('Räzel Nr 2', 'Nein')}
        {tf('Räzel Nr 3', '1')}
        {tf('Bus oder Velo?', 'Velo')}
        {tf('Die Antwort auf alles?', '42')}
        {correctCount >= position && (
          <Alert severity="success" icon={false}>
            <AlertTitle>Yay – Geschafft!</AlertTitle>47.47543353465387, 7.742019610119889
            <br />
            <br />
            🍟😋🎂
          </Alert>
        )}
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
