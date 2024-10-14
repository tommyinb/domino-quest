import { Suspense } from "react";
import "./App.css";
import { Scene } from "./scenes/Scene";
import { SceneProvider } from "./scenes/SceneProvider";
import { Stage } from "./stages/Stage";
import { StageProvider } from "./stages/StageProvider";

function App() {
  return (
    <div className="App">
      <Suspense>
        <SceneProvider>
          <StageProvider>
            <Scene>
              <Stage />
            </Scene>
          </StageProvider>
        </SceneProvider>
      </Suspense>
    </div>
  );
}

export default App;
