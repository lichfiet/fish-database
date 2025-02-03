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
  const [fishUpdated, setFishUpdated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/fish?fishname=*").then((res) => {
      setFish(res.data.message);
    }).catch((err) => console.log(err));
  }, []);


  return (
    <>
      {
        useEffect(() => {
          if (fishUpdated == true) {
            axios.get("http://localhost:3000/fish?fishname=*").then((res) => {
              setFish(res.data.message);
            }).catch((err) => console.log(err));

            console.log("Fish Updated");

            setFishUpdated(false);
          } else {
            console.log("Fish Not Updated");
          }
        }, [fishUpdated])
      }
      <h1>Test Fish</h1>
      <div>
        <div id="buttonBar">
          <row>
            <column className="buttonColumn">
              <input
                type="text"
                placeholder="Fish Name"
                onChange={(e) => setAddForm(e.target.value)}
                className="buttonForm"
              />
              <button
                type="button"
                onClick={async () => {
                  await axios.post("http://localhost:3000/fish", {
                    fishname: addForm,
                  }); setFishUpdated(true);
                }
                }
              >
                Add Fish
              </button>
            </column>
            <column className="buttonColumn">
              <input
                type="text"
                placeholder="Fish Name"
                onChange={(e) => setDelForm(e.target.value)}
                className="buttonForm"
              />
              <button
                type="button"
                onClick={async () => {
                  await axios.delete(
                    "http://localhost:3000/fish?fishname=" +
                    delForm +
                    "&fishid=" +
                    delForm
                  ); setFishUpdated(true);
                } // 
                }
              >
                Delete Fish
              </button>
            </column>
            <column className="buttonColumn">
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
