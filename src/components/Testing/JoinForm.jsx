import { useState } from "react";
import { useHMSActions } from "@100mslive/react-sdk";

function JoinForm() {
  const hmsActions = useHMSActions();
  const [inputValues, setInputValues] = useState({
    name: "Chirag",
    // 632c4b0f4208780bf663e3e1
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3Nfa2V5IjoiNjMyYjQyY2NlMDg4NjNhM2YyZjZjZDg3Iiwicm9vbV9pZCI6IjYzMmQ5YzgyNzA4NGI1OWY2M2E3OWRjZSIsInVzZXJfaWQiOiI2MzJiNDJjY2UwODg2M2EzZjJmNmNkODQiLCJyb2xlIjoic3BlYWtlciIsImp0aSI6IjU0OTM4NzFhLWM2Y2EtNDIzOC1hNmM2LTA0YTZhNDczOTQ1NyIsInR5cGUiOiJhcHAiLCJ2ZXJzaW9uIjoyLCJleHAiOjE2NjQwMTk5NzF9.9W3ZOOz1FwGuTfqtaS2hoTKUxSJ5dYPBxPGDD0Jacxk"
  });

  const handleInputChange = (e) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await hmsActions.join({
      userName: inputValues.name,
      authToken: inputValues.token
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join Room</h2>
      <div className="input-container">
        <input
          required
          value={inputValues.name}
          onChange={handleInputChange}
          id="name"
          type="text"
          name="name"
          placeholder="Your name"
        />
      </div>
      <div className="input-container">
        <input
          required
          value={inputValues.token}
          onChange={handleInputChange}
          id="token"
          type="text"
          name="token"
          placeholder="Auth token"
        />
      </div>
      <button className="btn-primary">Join</button>
    </form>
  );
}

export default JoinForm;
