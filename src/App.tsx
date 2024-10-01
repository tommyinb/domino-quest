import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import "./App.css";
import { Scene } from "./scenes/Scene";
import { Build } from "./stages/Build";
import { Ground } from "./stages/Ground";

function App() {
  return (
    <div className="App">
      <Canvas
        shadows
        camera={{ position: [-75, 125, 200], fov: 60, near: 1, far: 10000 }}
      >
        <Suspense>
          <Scene>
            <Ground />

            <Build />
          </Scene>
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
