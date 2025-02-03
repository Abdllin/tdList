import { useState } from "react";
import Button from "./Button";

export default function InputsApp() {
  const [buttonNames, setButtonNames] = useState(["status"]);
  const [spisok, setSpisok] = useState([""]);
  const [num, setNum] = useState(Array(spisok.length).fill(0));
  const [predict, setPredict] = useState(Array(spisok.length).fill(false));
  const primSpisok = ["status", "todo", "inProcess", "complete"];
  const [active, setActive] = useState(false);

  const buttonColors = {
    status: "grey",
    todo: "blue",
    inProcess: "orange",
    complete: "green",
  };

  function numAdder(index) {
    setNum((prevNum) => {
      const updatedNum = [...prevNum];
      updatedNum[index] = (updatedNum[index] + 1) % 4;
      return updatedNum;
    });
  }

  function removeLast(index) {
    const newSpisok = [...spisok];
    newSpisok.splice(index, 1);
    setSpisok(newSpisok);

    const newButtonNames = [...buttonNames];
    newButtonNames.splice(index, 1);
    setButtonNames(newButtonNames);

    const newPreditct = [...predict];
    newPreditct.splice(index, 1);
    setPredict(newPreditct);
  }

  function handleClick(index) {
    const newNames = [...buttonNames];
    newNames[index] = primSpisok[num[index]];
    setButtonNames(newNames);
    numAdder(index);
  }

  function editChanger(index) {
    setActive(!active);
    const newEdit = [...predict];
    newEdit[index] = !predict[index];
    setPredict(newEdit);
  }

  function handleInputChange(index, event) {
    const updatedSpisok = [...spisok];
    updatedSpisok[index] = event.target.value;
    setSpisok(updatedSpisok);
  }

  function addInput() {
    setSpisok((prevSpisok) => [...prevSpisok, ""]);
    setButtonNames((prevNames) => [...prevNames, "status"]);
    setNum((prevNum) => [...prevNum, 0]);
    setPredict((prevPredict) => [...prevPredict, false]);
  }

  return (
    <div className="inputdiv">
      <button className="buttonadd" onClick={addInput}>
        add
      </button>
      <div>
        <pre className="headinp">what we have to do</pre>
        <pre className="headbtn">status </pre>
        <pre className="headbtn">edit </pre>
        <pre className="headbtn">remove</pre>
        <hr />
      </div>
      <div>
        {spisok.map((spis, index) => (
          <ul key={index}>
            <li value={spis}>
              <input
                type="text"
                className="control"
                value={spis}
                onChange={(e) => handleInputChange(index, e)}
                readOnly={predict[index]}
              />
              <button
                label={buttonNames[index]}
                onClick={() => handleClick(index)}
                style={{ backgroundColor: buttonColors[buttonNames[index]] }} // Изменение цвета кнопки
              >
                {buttonNames[index]}
              </button>

              <button
                label="edit"
                className={`button ${predict[index] ? "active" : ""}`}
                onClick={() => editChanger(index)}
              >
                edit
              </button>
              <Button label="remove" onClick={() => removeLast(index)} />
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
