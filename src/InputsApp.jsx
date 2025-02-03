import { useState } from "react";
import Button from "./Button";

export default function InputsApp() {
  const [buttonNames, setButtonNames] = useState(["status"]); // изменение названия кнопки aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  const [spisok, setSpisok] = useState([""]); // наш добавочный инпут aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  const [num, setNum] = useState(Array(spisok.length).fill(0)); // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
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
      updatedNum[index] = (updatedNum[index] + 1) % 4; //наше число в массиве не превышает 4
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
    newNames[index] = primSpisok[num[index]]; // заменяем название кнопки по индексу
    setButtonNames(newNames); //замена названий кнопки в зависимости от числа
    numAdder(index);
  }

  function editChanger(index) {
    setActive(!active);
    const newEdit = [...predict];
    newEdit[index] = !predict[index];
    setPredict(newEdit);
  }

  //сохранаяем в инпут то что туда записали, (при добавлении value, эта функция почему то отключилась)
  function handleInputChange(index, event) {
    const updatedSpisok = [...spisok];
    updatedSpisok[index] = event.target.value;
    setSpisok(updatedSpisok);
  }

  //добавление инпутов
  function addInput() {
    setSpisok((prevSpisok) => [...prevSpisok, ""]); // ////////////////////////// adder
    setButtonNames((prevNames) => [...prevNames, "status"]);
    setNum((prevNum) => [...prevNum, 0]); // sked
    setPredict((prevPredict) => [...prevPredict, false]); // добавляем начальное значение для индекса
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
              <Button
                label={buttonNames[index]}
                onClick={() => handleClick(index)}
                style={{ backgroundColor: buttonColors[buttonNames[index]] }}
              >
                {buttonNames[index]}
              </Button>

              <Button
                label="edit"
                className={`button ${predict[index] ? "active" : ""}`}
                onClick={() => editChanger(index)}
              >
                edit
              </Button>
              <Button label="remove" onClick={() => removeLast(index)} />
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
}
