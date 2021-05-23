import "./App.css";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { Timeline } from "gsap/gsap-core";
import { useHistory } from "react-router-dom";
import Vessel from "./Components/Vessel";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const history = useHistory;
  const cellSize = 70; // chaque case fera 70px
  // x absisse horizontale
  // y ordonee verticale
  const MOVE_VECTOR = {
    // vector= mouvement qui a un point de depart et point darrivee
    S: { x: 0, y: -1 }, // aller vers le bas
    W: { x: -1, y: 0 }, // aller vers la gauche
    N: { x: 0, y: 1 }, // aller vers le haut
    E: { x: 1, y: 0 }, // aller vers la droite
  };

  const ORIENTATION_ANGLE = {
    S: 180, // aller vers le bas
    W: -90, // aller vers la gauche
    N: 0, // aller vers le haut
    E: 90, // aller vers la droite
  };

  const TURN_LEFT = {
    N: "W",
    W: "S",
    S: "E",
    E: "N",
  };

  const TURN_RIGHT = {
    N: "E",
    E: "S",
    S: "W",
    W: "N",
  };

  const robot = {
    x: 0,
    y: 0,
    orientation: "N",
    move: function () {
      this.x += MOVE_VECTOR[this.orientation].x;
      this.y += MOVE_VECTOR[this.orientation].y;
      console.log("this.x", this.x);
      console.log("this.y", this.y);
    },

    turnRight: function () {
      this.orientation = TURN_RIGHT[this.orientation];
    },

    turnLeft: function () {
      this.orientation = TURN_LEFT[this.orientation];
    },
  };

  const slider = document.getElementById("myRange");

  const updateSlider = () => {
    if (slider) {
      slider.value = tl.progress;
    }
  };

  const tl = gsap.timeline({ onUpdate: updateSlider, repeatDelay: 1 });
  const sendCordinates = () => {
    //WITH Timelines (cleaner, more versatile)
    tl.clear(); // effacer la timeline
    const coordinates = inputValue.split("");
    robot.x = 0;
    robot.y = 0;

    coordinates.map((el) => {
      switch (el) {
        case "L":
          robot.turnLeft();
          tl.to("#robot", {
            rotation: ORIENTATION_ANGLE[robot.orientation],
            duration: 0.5,
          });
          break;
        case "R":
          robot.turnRight();
          tl.to("#robot", {
            rotation: ORIENTATION_ANGLE[robot.orientation],
            duration: 0.5,
          });
          break;

        case "M":
          robot.move();
          tl.to("#robot", {
            x: robot.x * cellSize,
            y: robot.y * cellSize,
            duration: 0.5,
          });
          break;
        default:
      }
    });

    //tl.pause();
    // tl.resume();
    //tl.seek(1.5);
    tl.play();
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const resetInput = () => {
    setInputValue("");
    window.location.reload();
  };

  return (
    <div className="app">
      <div className="wrapper">
        <div className="command">
          <div className="firstInput">
            <input
              placeholder="Why not try with RMMM"
              value={inputValue}
              onChange={handleChange}
              type="text"
              className="path"
            />

            <button type="submit" onClick={sendCordinates} className="send">
              ENVOYER
            </button>

            <button type="submit" onClick={resetInput} className="send">
              RESET
            </button>
          </div>

          <div className="secondInput">
            <input
              placeholder="Why not try with RMMM"
              defaultValue="00N"
              onChange={handleChange}
              type="text"
              className="path"
            />
          </div>
        </div>

        <div id="ground" className="ground">
          <ul className="mars">
            <li id="0-4" className="square">
              0-4
            </li>
            <li id="1-4" className="square">
              1-4
            </li>
            <li id="2-4" className="square">
              2-4
            </li>
            <li id="3-4" className="square">
              3-4
            </li>
            <li id="4-4" className="square">
              4-4
            </li>
            <li id="0-3" className="square">
              0-3
            </li>
            <li id="1-3" className="square">
              1-3
            </li>
            <li id="2-3" className="square">
              2-3
            </li>
            <li id="3-3" className="square">
              3-3
            </li>
            <li id="4-3" className="square">
              4-3
            </li>
            <li id="0-2" className="square">
              0-2
            </li>
            <li id="1-2" className="square">
              1-2
            </li>
            <li id="2-2" className="square">
              2-2
            </li>
            <li id="3-2" className="square">
              3-2
            </li>
            <li id="4-2" className="square">
              4-2
            </li>
            <li id="0-1" className="square">
              0-1
            </li>
            <li id="1-1" className="square">
              1-1
            </li>
            <li id="2-1" className="square">
              2-1
            </li>
            <li id="3-1" className="square">
              3-1
            </li>
            <li id="4-1" className="square">
              4-1
            </li>
            <li id="0-0" className="square">
              0-0
              <div id="robot" className="robot">
                <Vessel />
              </div>
            </li>
            <li id="1-0" className="square">
              1-0
            </li>
            <li id="2-0" className="square">
              2-0
            </li>
            <li id="3-0" className="square">
              3-0
            </li>
            <li id="4-0" className="square">
              4-0
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
