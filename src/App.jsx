import "./App.css";
import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { Timeline } from "gsap/gsap-core";
import { useHistory } from "react-router-dom";

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
    // vector movement qui a un point de depart et point darrivee
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
          <input
            value={inputValue}
            onChange={handleChange}
            type="text"
            className="parcours"
          />

          <input
            defaultValue="00N"
            onChange={handleChange}
            type="text"
            className="parcours"
          />

          <button type="submit" onClick={sendCordinates} className="send">
            ENVOYER
          </button>

          <button type="submit" onClick={resetInput} className="send">
            RESET
          </button>
        </div>

        <div id="ground" className="ground">
          <ul className="mars">
            <div id="robot" className="robot">
              <img
                style={{ width: "3rem" }}
                src={`${process.env.PUBLIC_URL}/rover.png`}
              />
            </div>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
            <li className="square"></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
