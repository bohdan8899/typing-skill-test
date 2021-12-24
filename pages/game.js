import { useCallback, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import ResultModal from '../src/modals/ResultModal';
import { complete } from '../src/features/main/mainSlice'
import styles from '../styles/Game.module.css'

let timer = '';
let wrongCount = 0;

export default function Game() {
  const router = useRouter();
  const dispatch = useDispatch();
  const text = useSelector(state => state.main.text);
  const quoteRef = useRef(null);
  const inputRef = useRef(null);
  const started = useSelector((state) => state.main.started)
  const duration = useSelector(state => state.main.duration);
  const [openResultModal, setOpenResultModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  const updateTimer = useCallback(() => {
    if (timeLeft > 0) {
      console.log('111', timeLeft);
      setTimeLeft(timeLeft--);
    }
    else {
      // finish the game
      clearInterval(timer);
      dispatch(complete({
        typedCount: inputRef.current.value.length,
        wrongCount: wrongCount,
        seconds: duration*60
      }))
      setOpenResultModal(true);
    }
  }, [timeLeft, dispatch, duration]);
  
  useEffect(() => {
		if (!started) {
			router.push("/");
      return;
    }

    text.split('').forEach(char => {
      const charSpan = document.createElement('span')
      charSpan.innerText = char
      quoteRef.current.appendChild(charSpan)
    })

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  }, [])

  const handleCurrentText = useCallback((event) => {

    const curr_input_array = event.target.value.split('');
  
    let errors = 0;
  
    const quoteSpanArray = quoteRef.current.querySelectorAll('span');
    quoteSpanArray.forEach((char, index) => {
      let typedChar = curr_input_array[index]
  
      // characters not currently typed
      if (typedChar == null) {
        char.classList.remove(styles.correctChar);
        char.classList.remove(styles.incorrectChar);
  
        // correct characters
      } else if (typedChar === char.innerText) {
        char.classList.add(styles.correctChar);
        char.classList.remove(styles.incorrectChar);
  
        // incorrect characters
      } else {
        char.classList.add(styles.incorrectChar);
        char.classList.remove(styles.correctChar);
  
        // increment number of errors
        errors++;
      }
    });
    wrongCount = errors;
  
    // if current text is completely typed
    // irrespective of errors
    if (event.target.value.length == text.length) {
      clearInterval(timer);
      dispatch(complete({
        typedCount: event.target.value.length,
        wrongCount: errors,
        seconds: duration*60 - timeLeft
      }))
      setOpenResultModal(true);
    }
  }, [dispatch, text, duration, timeLeft]);
  const handleConfirmModalClose = useCallback(() => {
    setOpenResultModal(false);
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Typing Skill Test
        </h1>
        <div ref={quoteRef} className={styles.quote}></div>
        <textarea ref={inputRef} className={styles.inputArea} placeholder="start typing here..." onInput={handleCurrentText}></textarea>
        <div className={styles.timeLeft}>Time Left: {timeLeft}s</div>
        <ResultModal open={openResultModal} onClose={handleConfirmModalClose}/>
      </main>
    </div>
  )
}
