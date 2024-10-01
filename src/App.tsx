import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import "./App.css";
import { Scene } from "./scenes/Scene";
import { SceneProvider } from "./scenes/SceneProvider";
import { Build } from "./stages/Build";
import { Ground } from "./stages/Ground";

function App() {
  return (
    <div className="App">
      <Suspense>
        <SceneProvider>
          <Canvas
            camera={{ position: [-75, 125, 200], fov: 60, near: 1, far: 10000 }}
          >
            <Scene>
              <Ground />

              <Build />
            </Scene>
          </Canvas>
        </SceneProvider>
      </Suspense>
    </div>
  );
}

export default App;
