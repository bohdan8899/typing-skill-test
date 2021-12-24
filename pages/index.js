import Head from 'next/head'
import { useCallback, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import Select from 'react-select'
import { DURATION_OPTIONS, TYPING_TEXT_OPTIONS } from '../src/constants'
import styles from '../styles/Home.module.css'
import { useDispatch } from 'react-redux'
import { start } from '../src/features/main/mainSlice'
import { useRouter } from 'next/router'

export default function Home() {
  const [duration, setDuration] = useState(DURATION_OPTIONS[0]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [text, setText] = useState(TYPING_TEXT_OPTIONS[0]);
  const handleDurationChange = useCallback((newValue) => {
    setDuration(newValue);
  }, []);

  const handleTextChange = useCallback((newValue) => {
    setText(newValue);
  }, []);

  const handleStartClick = useCallback(() => {
    dispatch(start({duration: duration.value, text: text.value}));
    router.push('/game');
  }, [dispatch, router, duration, text]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Typing Skill Test
        </h1>

        <p className={styles.description}>
          Please select story and duration before the start of typing skill test.
        </p>

        <div className={styles.controls}>
          <div className={styles.field}>
            <label>Text:</label>
            <Select
              onChange={handleTextChange}
              value={text}
              options={TYPING_TEXT_OPTIONS}
            />
          </div>
          <div className={styles.field}>
            <label>Duration (minutes):</label>
            <CreatableSelect
              isClearable
              value={duration}
              onChange={handleDurationChange}
              options={DURATION_OPTIONS}
            />
          </div>
          <button onClick={handleStartClick}>Start Skill Test</button>
        </div>
      </main>
    </div>
  )
}
