import {Environment, OrbitControls} from "@react-three/drei";
import MapModel from "../../models/Map.jsx";
import {useEffect, useState} from "react";
import {insertCoin, Joystick, myPlayer, onPlayerJoin} from "playroomkit";
import {CharacterController} from "../CharacterController/index.jsx";
import {RigidBody} from "@react-three/rapier";

const GameScene = () => {
    const [players, setPlayers] = useState([]);
    const start = async () => {
        await insertCoin();

        onPlayerJoin((state) => {

            const joystick = new Joystick(state, {
                type: "angular",
                buttons: [{id: "fire", label: "Fire"}],
            });
            const newPlayer = {state, joystick};
            state.setState("health", 100);
            state.setState("deaths", 0);
            state.setState("kills", 0);
            setPlayers((players) => [...players, newPlayer]);
            state.onQuit(() => {
                setPlayers((players) => players.filter((p) => p.state.id !== state.id));
            });
        });
    };

    useEffect(() => {
        start();
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
                <RigidBody colliders="trimesh" type="fixed">
                    <MapModel/>
                </RigidBody>
                {players.map(({state, joystick}, index) => (
                    <CharacterController
                        key={state.id}
                        state={state}
                        userPlayer={state.id === myPlayer()?.id}
                        joystick={joystick}
                    />
                ))}
            </group>
        </>
    )
}

export default GameScene;
