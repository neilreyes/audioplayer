import React, { useRef, useState, useEffect } from 'react'
import track from '../tracks.js';

const AudioPlayer = () => {
	const [trackProgress, setTrackProgress] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const audioRef = useRef(new Audio(track[0].audioSrc))

	const { duration } = audioRef.current

	const handleChange = (e)=>{
		console.log(e.target.value);
	}

	const startTimer = () => {
		setInterval(() => {
			setTrackProgress(audioRef.current.currentTime);
		}, 1000);
	}

	useEffect(() => {
		if(isPlaying){
			audioRef.current.play()
			startTimer()
		} else {
			audioRef.current.pause()
		}
	}, [isPlaying])

	const handlePrevButton = (e) => {

	}

	const handleNextButton = (e) => {

	}

	const renderPlayToggle = () => {
		if (isPlaying) {
			return (<button className='play' onClick={()=>setIsPlaying(false)}>
				Pause
			</button>)
		} else {
			return (<button className='play' onClick={()=>setIsPlaying(true)}>
				Play
			</button>)
		} 
	}

	return (
		<>
			<div>
				<h1 style={{marginBottom: 0, lineHeight: '40px'}}>{track[0].title}</h1>
				<sub>{track[0].artist}</sub>
			</div>
			<div>
				<button className='next' onClick={handleNextButton}>
					Next
				</button>
				{renderPlayToggle()}
				<button className='prev' onClick={handlePrevButton}>
					Prev
				</button>
				<input
					type='range'
					name='trackProgress'
					className='trackProgress'
					step='1'
					min='0'
					max={duration ? duration : `${duration}`}
					value={trackProgress}
					onChange={handleChange}/>
			</div>
		</>
	)
}

export default AudioPlayer
