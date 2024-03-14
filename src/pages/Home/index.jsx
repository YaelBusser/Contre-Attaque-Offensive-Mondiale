import "./index.css";
import {Canvas} from "@react-three/fiber";
import GameScene from "../../components/scenes/Game/index.jsx";
import {PerformanceMonitor, SoftShadows} from "@react-three/drei";
import {Suspense, useState} from "react";
import {Physics} from "@react-three/rapier";

const Home = () => {
    return (
        <div className={"home"}>
            <Canvas shadows camera={{position: [10, 10, 10], fov: 70}}>
                <color attach={"background"} args={["lightblue"]}/>
                <SoftShadows size={40}/>
                <PerformanceMonitor/>
                <Suspense>
                    <Physics>
                        <GameScene/>
                    </Physics>
                </Suspense>
            </Canvas>
        </div>
    )
}

export default Home;
