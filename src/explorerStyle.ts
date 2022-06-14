export const exWrapper = "ex-wrapper";
export const exParentWrapper = "explorer";


export const explorerParentStyle = `
  #${exParentWrapper} {
    position: absolute;
    left: 0; 
    margin-left: auto; 
    margin-right: auto; 
    width: 600px;
    top: 50px;
    right: -100px;
    height: 500px;
    z-index: 500;
    display: none;
  }
`;

export const explorerIconStyle = `
  #explorer-icon {
    color: #9095ad;
    display: flex;
    justify-content: center;
    font-size: 1.5rem;
    cursor: pointer;
  }

  #explorer-icon:hover {
    color: #bec2d3;
    transition: 0.1s;
  }
`;

export const explorerStyle = `
  .ex-top-bar {
    display: flex;
    justify-content: flex-end;
    color: red;
    height: 50px;
  }

  .ex-input-wrapper {
    box-sizing: border-box;
    margin: 10px 0;
  }

  .ex-text-input {
    box-sizing: border-box;
    width: 100%;
    font-size: 1.2rem;
    padding: 4px;
    border: 1px solid gray;
    border-radius: 5px;
  }

  .ex-wrapper {
    padding: 20px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    border: 2px solid gray;
    font-size: 1.5rem;
    border-radius: 8px;
    background: #f3f4f6;
    /* background: rgba(255, 255, 255, 1); */
    box-shadow: 0px 5px 20px 1px;
    height: 100%;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }

  #ex-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 500px;
    overflow-y: scroll;
  }

  .ex-spec-item {
    display: flex;
    align-items: center;
    white-space: nowrap;
    overflow: hidden;
    margin: 5px 0;
  }

  .ex-input[type="checkbox"] {
    margin: 0 5px;
  }

  #ex-ul {
    padding: 0;
    margin: 10px !important;
  }

  .ex-button-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    justify-self: flex-end;
  }

  #ex-close-explorer {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ex-submit-button {
    height: 30px;
    width: 80px;
  }

  .ex-button {
    font-size: 1.0rem;
    background: #4956e3;
    color: white;
    border-radius: 4px;
    border: none;
    padding: 4px;
    cursor: pointer;
  }

  .ex-button:hover {
    transition: 0.1s;
    outline: 2px solid #4956e338;
  }
`;
