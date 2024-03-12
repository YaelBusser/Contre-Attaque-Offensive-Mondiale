import {Environment, OrbitControls} from "@react-three/drei";
import MapModel from "../../models/Map.jsx";
import {useEffect, useState} from "react";
import {insertCoin, Joystick, onPlayerJoin} from "playroomkit";

const GameScene = () => {
    const [players, setPlayers] = useState([])
    const [playerPosition, setPlayerPosition] = useState([0, 0, 0]);

    const start = async () => {
        await insertCoin();
    }
    useEffect(() => {
        start();

        const handleKeyDown = (event) => {
            const speed = 0.1; // Ajustez la vitesse du déplacement selon vos besoins
            const {key} = event;

            switch (key) {
                case "ArrowUp":
                    setPlayerPosition((prevPos) => [prevPos[0], prevPos[1], prevPos[2] - speed]);
                    break;
                case "ArrowDown":
                    setPlayerPosition((prevPos) => [prevPos[0], prevPos[1], prevPos[2] + speed]);
                    break;
                case "ArrowLeft":
                    setPlayerPosition((prevPos) => [prevPos[0] - speed, prevPos[1], prevPos[2]]);
                    break;
                case "ArrowRight":
                    setPlayerPosition((prevPos) => [prevPos[0] + speed, prevPos[1], prevPos[2]]);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        onPlayerJoin((state) => {
            const newPlayer = {state};
            state.setState("health", 100);
            state.setState("deaths", 0);
            state.setState("kills", 0);
            setPlayers((players) => [...players, newPlayer]);

            state.onQuit(() => {
                setPlayers((players) => players.filter((p) => p.state.id !== state.id));
            });
        });

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);
    return (
        <>
            <group>
                <OrbitControls/>
                <ambientLight castShadow color={"white"} intensity={1}/>
                <directionalLight
                    castShadow
                    color={"white"}
                    shadow-camera-near={0}
                    shadow-camera-far={80}
                    shadow-camera-left={-30}
                    shadow-camera-right={30}
                    shadow-camera-top={25}
                    shadow-camera-bottom={-25}
                    shadow-mapSize={[1024, 1024]}
                />
                <MapModel/>
            </group>
        </>
    )
}

export default GameScene;
