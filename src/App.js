import "./App.css";
import { useState } from "react";
import AudioPlayer from "./components/AudioPlayer";

function App() {
    const [onQueue, addOnQueue] = useState([]);

    return (
        <div style={{ margin: "0 auto", width: "250px" }}>
            <AudioPlayer />
        </div>
    );
}

export default App;
