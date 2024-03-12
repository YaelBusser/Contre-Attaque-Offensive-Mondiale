import "./index.css";
import {Canvas} from "@react-three/fiber";
import GameScene from "../../components/scenes/Game/index.jsx";
import {SoftShadows} from "@react-three/drei";

const Home = () => {
    return (
        <div className={"home"}>
            <Canvas shadows camera={{position: [10, 10, 10], fov: 70}}>
                <color attach={"background"}  args={["lightblue"]}/>
                <SoftShadows size={40} />
                <GameScene/>
            </Canvas>
        </div>
    )
}

export default Home;
