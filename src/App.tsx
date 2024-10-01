import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import "./App.css";
import { Scene } from "./Scene";
import { Build } from "./stages/Build";
import { Ground } from "./stages/Ground";

function App() {
  return (
    <div className="App">
      <Canvas shadows camera={{ position: [-40, 30, 50], fov: 15 }}>
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
