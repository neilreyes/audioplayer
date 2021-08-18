import React, { useRef, useState, useEffect } from 'react'
import AudioControls from './AudioControls'
import tracks from '../tracks.js'
import Moment from 'react-moment';

const AudioPlayer = () => {
	const [queueIndex, setQueueIndex] = useState(0)
	const [trackProgress, setTrackProgress] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)

	const { title, audioSrc, artwork, artist } = tracks[queueIndex]

	// audio el create via Audio constructor
	const audioRef = useRef(new Audio(audioSrc))
	// a ref to a setInterval timer
	const intervalRef = useRef()
	// a bool to determine when certain actions are ready to be run
	const isReady = useRef(false)

	const { duration, ended, currentTime } = audioRef.current

	const toPrevTrack = () => {
		console.log('TODO go to prev track on queue');
	}

	const toNextTrack = () => {
		console.log('TODO go to next track on queue');
	}

	// const handleChange = (e)=>{
	// 	setTrackProgress(e.target.value)
	// }

	const startTimer = () => {
		// clear any timers already running
		clearInterval(intervalRef.current)

		intervalRef.current = setInterval(() => {
			if (audioRef.current.ended) {
				toNextTrack()
			} else {
				setTrackProgress(audioRef.current.currentTime)
			}
		}, 1000);
	}

	useEffect(() => {
		if(isPlaying){
			audioRef.current.play()
			startTimer()
		} else {
			clearInterval(intervalRef.current)
			audioRef.current.pause()
		}
		
	}, [isPlaying])

	useEffect(() => {
		return () => {
			audioRef.current.pause()
			clearInterval(intervalRef.current)
		}
	}, [])

	// Pause currently playing track
	// update the value of audioRef to a new source
	// reset progress state which starts at currentTime = 0
	// set new track to play
	useEffect(() => {
		audioRef.current.pause()
		audioRef.current = new Audio(audioSrc)
		setTrackProgress(audioRef.current.currentTime)

		if(isReady.current) {
			audioRef.current.play()
			setIsPlaying(true)
			startTimer()
		} else {
			isReady.current = true
		}

	}, [queueIndex])

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

	const onScrubEnd = () => {
		if(!isPlaying){
			setIsPlaying(true)
		}
		startTimer()
	}

	const onScrub = (value) => {
		clearInterval(intervalRef.current)
		audioRef.current.currentTime = value
		setTrackProgress(audioRef.current.currentTime)
	}

	return (
		<>
			<div>
				<img src={artwork} alt={title}/>
				<h1 style={{marginBottom: 0, lineHeight: '40px'}}>{title}</h1>
				<sub>{artist}</sub>
			</div>
			<div>
				<AudioControls
					isPlaying={isPlaying}
					/>
				<button className='next' onClick={toNextTrack}>
					Next
				</button>
				{renderPlayToggle()}
				<button className='prev' onClick={toPrevTrack}>
					Prev
				</button>
				<Moment format="m:s">
						{trackProgress / duration}
				</Moment>
				<input
					type='range'
					name='trackProgress'
					className='trackProgress'
					step='1'
					min='0'
					max={duration ? duration : `${duration}`}
					value={trackProgress}
					onChange={(e)=>onScrub(e.target.value)}
					onMouseUp={onScrubEnd}
					onKeyUp={onScrubEnd}
					/>
			</div>
		</>
	)
}

export default AudioPlayer
