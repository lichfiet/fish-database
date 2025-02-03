import { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "semantic-ui-react";
import "./App.css";

const consoleWarn = console.warn;
const SUPPRESSED_WARNINGS = [
  "Support for defaultProps will be removed in a future version of React.",
];

console.warn = function filterWarnings(msg, ...args) {
  if (!SUPPRESSED_WARNINGS.some((entry) => msg.includes(entry))) {
    consoleWarn(msg, ...args);
  }
};

function App() {
  const [fish, setFish] = useState([]);
  const [addForm, setAddForm] = useState("");
  const [delForm, setDelForm] = useState("");

  return (
    <>
      <h1>Test Fish</h1>
      <div>
        <div id="buttonBar">
          <row>
            <column class="buttonColumn">
              <input
                type="text"
                placeholder="Fish Name"
                onChange={(e) => setAddForm(e.target.value)}
                class="buttonForm"
              />
              <button
                type="button"
                onClick={() =>
                  axios.post("http://localhost:3000/fish", {
                    fishname: addForm,
                  })
                }
              >
                Add Fish
              </button>
            </column>
            <column class="buttonColumn">
              <input
                type="text"
                placeholder="Fish Name"
                onChange={(e) => setDelForm(e.target.value)}
                class="buttonForm"
              />
              <button
                type="button"
                onClick={() =>
                  axios.delete(
                    "http://localhost:3000/fish?fishname=" +
                      delForm +
                      "&fishid=" +
                      delForm
                  )
                }
              >
                Delete Fish
              </button>
            </column>
            <column class="buttonColumn">
              <button
                onClick={() =>
                  axios
                    .get("http://localhost:3000/fish?fishname=*")
                    .then((res) =>
                      res.data.message != undefined
                        ? setFish(res.data.message)
                        : setFish([]) & console.log(res.data.message)
                    )
                    .catch((err) => console.log(err))
                }
              >
                Load Fish
              </button>
            </column>
          </row>
        </div>
        <div
          id="fishTable"
          style={{ width: "50%", height: "40vh", margin: "auto" }}
        >
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell sorted="descending">fishid</Table.HeaderCell>
                <Table.HeaderCell>fishname</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {fish.map((el) => {
                return (
                  <Table.Row key={el.fishid}>
                    <Table.Cell>{el.fishid}</Table.Cell>
                    <Table.Cell>{el.fishname}</Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
}

export default App;
